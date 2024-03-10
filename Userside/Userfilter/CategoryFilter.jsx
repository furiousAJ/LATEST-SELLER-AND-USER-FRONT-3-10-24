import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../../../Api';
import './products.scss';

const CategoryFilter = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    axios.get(baseUrl + "/product/productview")
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    axios.get(baseUrl + '/category/categoryview')
      .then((response) => {
        setCategory(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    const filtered = category ? data.filter(item => 
      item.prod && item.prod.length > 0 && item.prod[0].Categoryname.toLowerCase() === category.toLowerCase()
    ) : data;
    navigate(`/category/${category}`);
  };

  return (
    <div>
      <div className='category-select'>
        <label>Select a category:</label>
        <select
          className='boxcategory'
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">All</option>
          {category.map((value) => (
            <option key={value._id} value={value.Categoryname}>
              {value.Categoryname}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CategoryFilter;
