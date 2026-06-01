class APIFeatures {


  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {

    const keyword = this.queryStr.keyword
      ? {
  
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    console.log(queryCopy);

    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((el) => delete queryCopy[el]);

    console.log(queryCopy);

    let queryStr = JSON.stringify(queryCopy);

    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    console.log(queryStr);

  

    this.query = this.query.find(JSON.parse(queryStr));

    // Check if sortBy is specified in the query parameters
    if (this.queryStr.sortBy) {
      const sortBy = this.queryStr.sortBy.toLowerCase();

      // Sort by ratings (highest to lowest)
      if (sortBy === "ratings") {
        sortQuery = { ratings: -1 };
      }
      // Sort by reviews (highest to lowest)
      else if (sortBy === "reviews") {
        sortQuery = { numOfReviews: -1 };
      }
    }

    // Apply the sorting query to the APIFeatures
    this.query = this.query.sort(sortQuery);


    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
  sort() {
    // Check if sortBy is specified in the query parameters
    if (this.queryStr.sortBy) {
      const sortBy = this.queryStr.sortBy.toLowerCase();
      let sortQuery = {};

      // Sort by ratings (highest to lowest)
      if (sortBy === "ratings") {
        sortQuery = { ratings: -1 };
      }
      // Sort by reviews (highest to lowest)
      else if (sortBy === "reviews") {
        sortQuery = { numOfReviews: -1 };
      }

      // Apply the sorting query to the APIFeatures
      this.query = this.query.sort(sortQuery);
    }

    return this;
  }
}

module.exports = APIFeatures;
