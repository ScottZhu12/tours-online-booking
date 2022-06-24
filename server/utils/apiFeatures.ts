class APIFeatures {
  query: any;
  queryString: any;

  constructor(query: any, queryString: any) {
    this.query = query;
    this.queryString = queryString;
  }

  filter = () => {
    // 1) filtering
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 2) advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  };

  sort = () => {
    // sort
    if (this.queryString.sort) {
      const sortBy = (this.queryString.sort as string).split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  };

  limitFields = () => {
    // filed limiting
    if (this.queryString.fields) {
      const fields = (this.queryString.fields as string).split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      // exclude __v property only
      this.query = this.query.select('-__v');
    }

    return this;
  };

  paginate = () => {
    // pagination
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 100;
    const skipVal = (page - 1) * limit;
    // on page=2&limit=10, 1-10: page 1, 11-20: page 2
    this.query = this.query.skip(skipVal).limit(limit);

    return this;
  };
}

export default APIFeatures;
