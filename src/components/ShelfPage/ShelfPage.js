import { useState, useEffect } from 'react';
import axios from 'axios';
import './ShelfPage.css';
import { useDispatch } from 'react-redux';

function ShelfPage() {
  const dispatch = useDispatch();
  const [shelfList, setShelfList] = useState([]);
  const [newItem, setNewItem] = useState({description: '', image_url: ''})

  useEffect(() => {
    fetchShelf();
  }, []);


  const fetchShelf = () => {
    axios.get('/api/shelf').then((response) => {
      setShelfList(response.data);
    }).catch((error) => {
      console.log(error);
      alert('Something went wrong.');
    });
  }

  const handleNewItem = (key, value) => {
    console.log('new item added');
    setNewItem({...newItem, [key]: value})
  }

  const addItem = (event) => {
    axios.post('/api/shelf').then((response) => {
      event.preventDefault();
      dispatch({ type: 'SEND_NEW_ITEM', payload: newItem});
      setNewItem({description: '', image_url: ''})
    })

  }

  return (
    <div className="container">
      <h2>Add Item</h2>
      <pre>{JSON.stringify(newItem)}</pre>
      <form onSubmit={addItem}>
        <input type='text' value={newItem.description} placeholder='Description' onChange={(event) => handleNewItem('description', event.target.value)} />
        <input type='text' value={newItem.image_url} placeholder='Image Url' onChange={(event) => handleNewItem('image_url', event.target.value)} />
      </form>
      <input type='submit' value='Add New Item' />
      <h2>Shelf</h2>
      <p>All of the available items can be seen here.</p>
      {
        shelfList.length === 0 && (
          <div>No items on the shelf</div>
        )
      }
      {
        shelfList.map(item => {
          return <div className="responsive" key={item.id}>
                    <div className="gallery">
                        <img src={item.image_url} alt={item.description} />
                        <br />
                        <div className="desc">{item.description}</div>
                        <div style={{textAlign: 'center', padding: '5px'}}>
                          <button style={{cursor: 'pointer'}}>Delete</button>
                        </div>
                    </div>
                 </div>
        })
      }
      <div className="clearfix"></div>
    </div>
  );
}

export default ShelfPage;
