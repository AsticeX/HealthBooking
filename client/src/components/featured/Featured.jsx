import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";

const Featured = () => {
  const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_API}/hotels/countByCity?cities=berlin,madrid,london`
  );
  const [citiesData, setCitiesData] = useState([]);

  useEffect(() => {
    if (data && data.length === 3) {
      setCitiesData(data);
    }
  }, [data]);

  return (
    // <div className="container mt-5">
    //   {loading ? (
    //     <Spinner animation="border" role="status">
    //       <span className="sr-only">Loading...</span>
    //     </Spinner>
    //   ) : (
    //     <div className="row">
    //       <div className="col-md-4 mb-4">
    //         <div className="card">
    //           <img
    //             src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
    //             alt=""
    //             className="card-img-top"
    //           />
    //           <div className="card-body">
    //             <h5 className="card-title">Berlin</h5>
    //             <p className="card-text">{citiesData[0]} properties</p>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="col-md-4 mb-4">
    //         <div className="card">
    //           <img
    //             src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
    //             alt=""
    //             className="card-img-top"
    //           />
    //           <div className="card-body">
    //             <h5 className="card-title">Madrid</h5>
    //             <p className="card-text">{citiesData[1]} properties</p>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="col-md-4 mb-4">
    //         <div className="card">
    //           <img
    //             src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
    //             alt=""
    //             className="card-img-top"
    //           />
    //           <div className="card-body">
    //             <h5 className="card-title">London</h5>
    //             <p className="card-text">{citiesData[2]} properties</p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </div>
    <div></div>
  );
};

export default Featured;
