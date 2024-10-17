
export const useGetUserID = () => {
    
    const userID = window.localStorage.getItem("userID");
    console.log("Retrieved User ID:", userID); // Log the User ID
    return userID;
  };
  