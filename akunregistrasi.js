// Function to retrieve a specific cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  
  // Retrieve the 'userId' cookie
  const userId = getCookie('userId');
  
  // Now you can use the 'userId' variable in your code
  console.log('userId:', userId);
  