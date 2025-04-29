import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/config';
import CategorySelector from '../components/CategorySelector';
import ItemCard from '../components/ItemCard';
import HeroSection from '../components/HeroSection';
import LocationSearch from '../components/LocationSearch';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [recentItems, setRecentItems] = useState([]);
  const [popularCategories, setPopularCategories] = useState([]);
  const [searchLocation, setSearchLocation] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch featured items
  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
        const featuredQuery = query(
          collection(db, 'items'),
          where('status', '==', 'active'),
          where('isFeatured', '==', true),
          limit(4)
        );
        
        const itemsSnapshot = await getDocs(featuredQuery);
        const itemsList = itemsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setFeaturedItems(itemsList);
      } catch (error) {
        console.error('Error fetching featured items:', error);
      }
    };

    const fetchRecentItems = async () => {
      try {
        const recentQuery = query(
          collection(db, 'items'),
          where('status', '==', 'active'),
          orderBy('createdAt', 'desc'),
          limit(8)
        );
        
        const itemsSnapshot = await getDocs(recentQuery);
        const itemsList = itemsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setRecentItems(itemsList);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching recent items:', error);
        setIsLoading(false);
      }
    };

    const fetchPopularCategories = async () => {
      // In a real implementation, this would be based on item counts or views
      setPopularCategories([
        { id: 'tools', name: 'Tools & Equipment', icon: 'tools' },
        { id: 'outdoor', name: 'Outdoor Gear', icon: 'mountain' },
        { id: 'electronics', name: 'Electronics', icon: 'laptop' },
        { id: 'party', name: 'Party Supplies', icon: 'glass-cheers' },
        { id: 'sports', name: 'Sports Equipment', icon: 'basketball-ball' },
        { id: 'home', name: 'Home & Garden', icon: 'home' }
      ]);
    };

    fetchFeaturedItems();
    fetchRecentItems();
    fetchPopularCategories();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?location=${encodeURIComponent(searchLocation)}&category=${searchCategory}`);
  };

  return (
    <div className="homepage">
      <HeroSection />
      
      <Container className="search-container py-5">
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card className="shadow">
              <Card.Body>
                <h3 className="text-center mb-4">Find Items to Rent Nearby</h3>
                <Form onSubmit={handleSearch}>
                  <Row>
                    <Col md={5}>
                      <LocationSearch 
                        value={searchLocation} 
                        onChange={setSearchLocation} 
                        placeholder="Raymore, Kansas City, etc."
                      />
                    </Col>
                    <Col md={5}>
                      <CategorySelector
                        value={searchCategory}
                        onChange={setSearchCategory}
                      />
                    </Col>
                    <Col md={2}>
                      <Button variant="primary" type="submit" className="w-100">
                        Search
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Container className="mb-5">
        <h2 className="text-center mb-4">Browse Popular Categories</h2>
        <Row>
          {popularCategories.map(category => (
            <Col key={category.id} xs={6} md={4} lg={2} className="mb-4">
              <Card 
                className="category-card text-center h-100" 
                onClick={() => navigate(`/categories/${category.id}`)}
              >
                <Card.Body>
                  <i className={`fas fa-${category.icon} fa-2x mb-3`}></i>
                  <Card.Title>{category.name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {featuredItems.length > 0 && (
        <Container className="mb-5">
          <Row className="align-items-center mb-4">
            <Col>
              <h2 className="m-0">Featured Items</h2>
            </Col>
            <Col xs="auto">
              <Button variant="outline-primary" onClick={() => navigate('/search?featured=true')}>
                View All
              </Button>
            </Col>
          </Row>
          <Row>
            {featuredItems.map(item => (
              <Col key={item.id} md={6} lg={3} className="mb-4">
                <ItemCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      )}

      <Container className="mb-5">
        <Row className="align-items-center mb-4">
          <Col>
            <h2 className="m-0">Recently Added</h2>
          </Col>
          <Col xs="auto">
            <Button variant="outline-primary" onClick={() => navigate('/search?sort=newest')}>
              View All
            </Button>
          </Col>
        </Row>
        <Row>
          {isLoading ? (
            <Col className="text-center py-5">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </Col>
          ) : (
            recentItems.map(item => (
              <Col key={item.id} md={6} lg={3} className="mb-4">
                <ItemCard item={item} />
              </Col>
            ))
          )}
        </Row>
      </Container>

      <Container className="cta-section py-5 my-5 bg-light rounded">
        <Row className="justify-content-center text-center">
          <Col md={8}>
            <h2>Have Items to Share?</h2>
            <p className="lead mb-4">
              Earn extra income by renting out items you don't use every day. 
              Listing on LocalLend is quick, easy, and free!
            </p>
            <Button 
              variant="success" 
              size="lg" 
              onClick={() => navigate('/list-item')}
            >
              List Your Items
            </Button>
          </Col>
        </Row>
      </Container>

      <Container className="how-it-works py-5 mb-5">
        <h2 className="text-center mb-5">How LocalLend Works</h2>
        <Row>
          <Col md={4} className="text-center mb-4 mb-md-0">
            <div className="process-icon mb-3">
              <i className="fas fa-search fa-3x"></i>
            </div>
            <h4>Find What You Need</h4>
            <p>Browse thousands of items available to rent in your local area.</p>
          </Col>
          <Col md={4} className="text-center mb-4 mb-md-0">
            <div className="process-icon mb-3">
              <i className="fas fa-calendar-check fa-3x"></i>
            </div>
            <h4>Book & Pay Securely</h4>
            <p>Reserve items for the dates you need and pay securely through our platform.</p>
          </Col>
          <Col md={4} className="text-center">
            <div className="process-icon mb-3">
              <i className="fas fa-handshake fa-3x"></i>
            </div>
            <h4>Pick Up & Return</h4>
            <p>Meet the owner to pick up your item and return it when you're done.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;

