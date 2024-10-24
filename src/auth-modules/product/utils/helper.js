
  const getProduct = (data, products) => {
    try {
      // Filter active products and map to get only _id and color fields
      const groupedByColor = products
        .filter((item) => item.active === true)
        .map((item) => ({
          _id: item._id,
          color: item.color
        }));
  
      // Filter out the main product's color
      const withOutMain_id = groupedByColor.filter((item) => item.color !== data?.color);
  
      // Remove duplicate colors
      const uniqueColors = withOutMain_id.filter((value, index, self) =>
        index === self.findIndex((item) => item.color === value.color)
      );
  
      // Add the main product's color back to the list
      uniqueColors.push({ _id: data?._id, color: data?.color });
  
      // Sort colors alphabetically by the 'color' field
      uniqueColors.sort((a, b) => a.color.localeCompare(b.color));
  
      // Transform the main product's data
      const result = {
        ...data._doc,
        color: uniqueColors
      };
  
      return result;
    } catch (err) {
      return null;
    }
  };
  
module.exports = {
      getProduct,
  };
  