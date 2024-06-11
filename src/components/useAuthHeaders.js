import { useState, useEffect } from 'react';

function useAuthHeaders(token) {
  const [headers, setHeaders] = useState(null);

  useEffect(() => {
    if (token) {
        console.log(token)
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);
      setHeaders(myHeaders);
      console.log(headers, myHeaders)
    } else {
      setHeaders(null);
    }
  }, []); // Update headers only when token changes
  console.log(headers)
 
  return headers;
}

export default useAuthHeaders;
