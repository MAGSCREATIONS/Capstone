// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    // Form Validation and Submission
    const signupForm = document.getElementById('signupForm');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            clearErrors();
            
            // Validate form
            let isValid = validateForm();
            
            if (isValid) {
                // Show success message
                showSuccessMessage();
            }
        });

        // Real-time validation
        const inputs = signupForm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(input);
            });

            input.addEventListener('input', function() {
                // Clear error when user starts typing
                if (input.classList.contains('error')) {
                    clearFieldError(input);
                }
            });
        });
    }
});

// Validation Functions
function validateForm() {
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const terms = document.getElementById('terms');

    let isValid = true;

    // Validate First Name
    if (!validateField(firstName)) {
        isValid = false;
    }

    // Validate Last Name
    if (!validateField(lastName)) {
        isValid = false;
    }

    // Validate Email
    if (!validateEmail(email)) {
        isValid = false;
    }

    // Validate Phone (optional but if provided, should be valid)
    if (phone.value.trim() && !validatePhone(phone)) {
        isValid = false;
    }

    // Validate Password
    if (!validatePassword(password)) {
        isValid = false;
    }

    // Validate Confirm Password
    if (!validateConfirmPassword(password, confirmPassword)) {
        isValid = false;
    }

    // Validate Terms
    if (!terms.checked) {
        showError('terms', 'You must agree to the terms and conditions');
        isValid = false;
    }

    return isValid;
}

function validateField(field) {
    const value = field.value.trim();

    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        showError(field.id, `${getFieldLabel(field.id)} is required`);
        return false;
    }

    // Check minimum length for password
    if (field.type === 'password' && field.id === 'password' && value.length < 8) {
        showError(field.id, 'Password must be at least 8 characters long');
        return false;
    }

    clearFieldError(field);
    return true;
}

function validateEmail(emailField) {
    const email = emailField.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        showError(emailField.id, 'Email is required');
        return false;
    }

    if (!emailRegex.test(email)) {
        showError(emailField.id, 'Please enter a valid email address');
        return false;
    }

    clearFieldError(emailField);
    return true;
}

function validatePhone(phoneField) {
    const phone = phoneField.value.trim();
    const phoneRegex = /^[\d\s\-\(\)]+$/;

    if (phone && !phoneRegex.test(phone)) {
        showError(phoneField.id, 'Please enter a valid phone number');
        return false;
    }

    clearFieldError(phoneField);
    return true;
}

function validatePassword(passwordField) {
    const password = passwordField.value;

    if (!password) {
        showError(passwordField.id, 'Password is required');
        return false;
    }

    if (password.length < 8) {
        showError(passwordField.id, 'Password must be at least 8 characters long');
        return false;
    }

    clearFieldError(passwordField);
    return true;
}

function validateConfirmPassword(passwordField, confirmPasswordField) {
    const password = passwordField.value;
    const confirmPassword = confirmPasswordField.value;

    if (!confirmPassword) {
        showError(confirmPasswordField.id, 'Please confirm your password');
        return false;
    }

    if (password !== confirmPassword) {
        showError(confirmPasswordField.id, 'Passwords do not match');
        return false;
    }

    clearFieldError(confirmPasswordField);
    return true;
}

function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    const field = document.getElementById(fieldId);

    if (errorElement) {
        errorElement.textContent = message;
    }

    if (field) {
        field.classList.add('error');
        field.style.borderColor = '#FF6B6B';
    }
}

function clearFieldError(field) {
    const errorElement = document.getElementById(field.id + 'Error');
    
    if (errorElement) {
        errorElement.textContent = '';
    }

    field.classList.remove('error');
    field.style.borderColor = '';
}

function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const errorFields = document.querySelectorAll('.error');

    errorMessages.forEach(error => {
        error.textContent = '';
    });

    errorFields.forEach(field => {
        field.classList.remove('error');
        field.style.borderColor = '';
    });
}

function getFieldLabel(fieldId) {
    const labels = {
        'firstName': 'First Name',
        'lastName': 'Last Name',
        'email': 'Email',
        'phone': 'Phone Number',
        'password': 'Password',
        'confirmPassword': 'Confirm Password',
        'terms': 'Terms'
    };
    return labels[fieldId] || fieldId;
}

function showSuccessMessage() {
    const form = document.getElementById('signupForm');
    const successMessage = document.getElementById('successMessage');

    if (form && successMessage) {
        form.style.display = 'none';
        successMessage.style.display = 'block';

        // Scroll to top of success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards and other elements
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .offer-item, .about-section');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

