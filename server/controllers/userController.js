//Get User Api
export const getUserData = (req, res) => {
  try {
    const role = req.user.role;
    const recentSearchedCities = req.user.recentSearchedCities;
    res.status(200).json({ role, recentSearchedCities });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//Store Recent Search City Api
export const storeRecentSearchCity = async (req, res) => {
  try {
    const { city } = req.body;
    const user = req.user;

    // Ensure city is not already in the list to avoid duplicates and move it to the front
    if (user.recentSearchedCities.includes(city)) {
      user.recentSearchedCities = user.recentSearchedCities.filter(c => c !== city);
    }
    // Add to front of history
    user.recentSearchedCities.unshift(city);
    if (user.recentSearchedCities.length > 5) {
      user.recentSearchedCities.pop();
    }

    await user.save();
    res.status(200).json({ success: true, message: "Recent Search Cities Updated Successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update Recent Search Cities" });
  }
};