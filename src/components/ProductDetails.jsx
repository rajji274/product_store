import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProductDetail = () => {
  const { id } = useParams(); // get the product ID from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProductDetail();
  }, [id]);

  if (!product) return <p className='page-load'>Loading...</p>;

  return (
    <div className="product-details">
        <div className="product-images">
              <img src={product.thumbnail} className="product-img"alt={product.title} />
        </div>
        <div className="product-data">
            <h2 className='title'>{product.title}</h2>

            <p className='description'>{product.description}</p>
            <p className='price'>Price: ${product.price}</p>
            <p className='brande'>Brand: {product.brand}</p>
            <p className='rating'>Rating: {product.rating}</p>
            <p className='stock'>Stock: {product.stock}</p>
        </div>
    </div>
  );
};

export default ProductDetail;
