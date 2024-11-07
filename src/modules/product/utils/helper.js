const getProduct = (data, products) => {
  try {
    // Filter active products and map to get only _id, color, size, and inventoryCount fields
    const groupedByColorAndSize = products
      .filter((item) => item.active === true)
      .map((item) => ({
        _id: item._id,
        color: item.color,
        size: item.size,
        inventoryCount: item.inventoryCount
      }));

    // Filter out the main product's color and size
    const withOutMainColorAndSize = groupedByColorAndSize.filter(
      (item) => item.color !== data?.color || item.size !== data?.size
    );

    // Remove duplicate color and size combinations
    const uniqueItems = withOutMainColorAndSize.filter((value, index, self) =>
      index === self.findIndex((item) => item.color === value.color && item.size === value.size)
    );

    // Add the main product's color and size back to the list
    uniqueItems.push({
      _id: data?._id,
      color: data?.color,
      size: data?.size,
      inventoryCount: data?.inventoryCount,

    });

    // Sort the items first by color, then by size
    uniqueItems.sort((a, b) => {
      if (a.color === b.color) {
        return a.size.localeCompare(b.size); // Sort by size if colors are the same
      }
      return a.color.localeCompare(b.color); // Otherwise, sort by color
    });

    // Group by color and attach sizes with inventory count
    const groupedByColor = uniqueItems.reduce((acc, item) => {
      if (!acc[item.color]) {
        acc[item.color] = [];
      }
      // Group by color, then by size
      const sizeEntry = {
        size: item.size,
        inventoryCount: item.inventoryCount,
        _id: item._id
      };
      // Check if size already exists for that color
      const existingSize = acc[item.color].find((entry) => entry.size === item.size);
      if (existingSize) {
        existingSize.inventoryCount += item.inventoryCount; // Aggregate inventory count for the same size
      } else {
        acc[item.color].push(sizeEntry);
      }
      return acc;
    }, {});

    // Sort colors alphabetically and sizes within each color
    const sortedColors = Object.keys(groupedByColor)
      .sort()
      .map((color) => ({
        color,
        sizes: groupedByColor[color].sort((a, b) => a.size.localeCompare(b.size)) // Sort sizes alphabetically
      }));

    // Transform the main product's data to include color and size groups with inventory counts
    const result = {
      // ...data,
      color: sortedColors
    };

    return result;
  } catch (err) {
    console.error("Error in getProduct:", err);
    return null;
  }
};

module.exports = {
  getProduct,
};


