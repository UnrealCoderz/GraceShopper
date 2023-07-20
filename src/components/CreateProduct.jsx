import React, { useState } from "react";
import { createProduct, GetAllProducts } from "../api";
const CreateProduct = ({ setShowForm, user, products, setProducts, token }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [categoryid, setCategoryid] = useState([]);
  const [active, setActive] = useState(true);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('user id is ', user.id);
    const product = {
      sellerId: user.id,
      name,
      description,
      image,
      price,
      active,
    };
    const newProd = await createProduct(product, token);
    setProducts(await GetAllProducts());
    setShowForm(false);
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>Create Product</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>
          <div>
            <label>Price:</label>
            <input
              type="number"
              value={price}
              onChange={handlePriceChange}
              required
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              required
            />
          </div>
          <div>
            <label>Image:</label>
            <input
              type="text"
              value={image}
              onChange={handleImageChange}
              required
            />
          </div>
          <div>
            <button type="submit">Save</button>
            <button type="button" onClick={handleSubmit}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
