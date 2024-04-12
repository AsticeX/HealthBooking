import useFetch from "../../hooks/useFetch";
import { Spinner } from "react-bootstrap";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=4");

  return (
    <div className="container mt-5">
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <div className="row">
          {data.map((item) => (
            <div className="col-md-3 mb-4" key={item._id}>
              <div className="card">
                <img
                  src={item.photos[0]}
                  alt=""
                  className="card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">{item.city}</p>
                  <p className="card-text">Starting from ${item.cheapestPrice}</p>
                  {item.rating && (
                    <div className="fpRating">
                      <button className="btn btn-primary">{item.rating}</button>
                      <span className="ml-2">Excellent</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedProperties;
