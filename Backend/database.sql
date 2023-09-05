CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE users 
ADD COLUMN biography TEXT;

--insert fake users
INSERT INTO users (user_id, username, password, email, full_name, is_admin) VALUES('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'test','test1' ,'test1@test.com', 'test', 'false')

CREATE TABLE ride_types (
    ride_type_id UUID PRIMARY KEY,
    type_name VARCHAR(255) NOT NULL
);

CREATE TABLE posts (
    post_id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    ride_type_id UUID REFERENCES ride_types(ride_type_id) ON DELETE SET NULL,
    location VARCHAR(255) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    max_pax INTEGER NOT NULL,
    details TEXT,
    ride_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE post_enquiries (
    enquiry_id UUID PRIMARY KEY,
    post_id UUID REFERENCES posts(post_id) ON DELETE CASCADE,
    enquirer_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rider_reviews (
    review_id UUID PRIMARY KEY,
    reviewer_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    reviewed_user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    points INTEGER NOT NULL CHECK (points IN (-1, 1)),
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE post_registrations (
    registration_id UUID PRIMARY KEY,
    post_id UUID REFERENCES posts(post_id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
