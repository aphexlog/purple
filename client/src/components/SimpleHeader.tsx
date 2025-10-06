import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SimpleHeader: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header style={{
      background: 'white',
      borderBottom: '1px solid #e5e7eb',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    }}>
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <Link to="/" style={{textDecoration: 'none'}} className="flex items-center space-x-2">
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #9333ea, #2563eb)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold'
            }}>
              P
            </div>
            <div>
              <h1 style={{margin: 0, fontSize: '1.25rem', fontWeight: 'bold', color: '#111827'}}>
                Purple Survey
              </h1>
              <p style={{margin: 0, fontSize: '12px', color: '#6b7280'}}>
                Survey Builder
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s',
                ...(isActive('/') 
                  ? { color: '#7c3aed', background: '#f3e8ff' }
                  : { color: '#374151' }
                )
              }}
            >
              Home
            </Link>
            <Link
              to="/surveys"
              style={{
                padding: '8px 12px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s',
                ...(isActive('/surveys') 
                  ? { color: '#7c3aed', background: '#f3e8ff' }
                  : { color: '#374151' }
                )
              }}
            >
              My Surveys
            </Link>
          </nav>

          <Link
            to="/create"
            className="btn btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '8px 16px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            ➕ Create Survey
          </Link>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden" style={{marginTop: '1rem', display: 'flex', gap: '1rem'}}>
          <Link
            to="/"
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              ...(isActive('/') 
                ? { color: '#7c3aed', background: '#f3e8ff' }
                : { color: '#374151' }
              )
            }}
          >
            Home
          </Link>
          <Link
            to="/surveys"
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              ...(isActive('/surveys') 
                ? { color: '#7c3aed', background: '#f3e8ff' }
                : { color: '#374151' }
              )
            }}
          >
            📋 My Surveys
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default SimpleHeader;