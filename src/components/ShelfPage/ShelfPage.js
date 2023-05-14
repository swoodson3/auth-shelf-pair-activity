import { useState, useEffect } from 'react';
import axios from 'axios';
import './ShelfPage.css';
import { useDispatch } from 'react-redux';

function ShelfPage() {
  const dispatch = useDispatch();
  const [shelfList, setShelfList] = useState([]);
  // const [newItem, setNewItem] = useState({description: '', image_url: ''})
  const [description, setDescription] = useState('');
  const [image_url, setImageUrl] = useState('');


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

  // const handleNewItem = (key, value) => {
  //   console.log('new item added');
  //   setNewItem({...newItem, [key]: value})
  // }

  // const addItem = (event) => {
  //   axios.post('/api/shelf').then((response) => {
  //     event.preventDefault();
  //     dispatch({ type: 'SEND_NEW_ITEM', payload: newItem});
  //     setNewItem({description: '', image_url: ''})
  //   })

  // }

  const addItem = () => {
    axios.post('/api/shelf', {
      description: description,
      image_url: image_url,
    }).then((result) => {
      console.log(`result:`, result.data);
      fetchShelf();
    }).catch((error) => {
      console.log(`Error in POST: ${error}`);
      alert(`Get that off the shelf!`);
    })
  }

    const handleDescription = (event) => {
      setDescription(event.target.value)
      console.log(description)
      // const action = {type: 'SET_DESCRIPTION', payload: event.target.value}
      // dispatch(action);
    }

    const handleImageUrl = (event) => {
      setImageUrl(event.target.value)
      console.log(image_url)
      // const action = {type: 'SET_URL', payload: event.target.value}
      // dispatch(action);
    }

    const deleteItem = (id) => {
      axios.delete(`/api/shelf/${id}`).then(response => {
        fetchShelf();
      }).catch(error => {
        console.log(`Error in deleteItem: ${error}`);
      });
    }
  
  

  return (
    <div className="container">
      <h2>Add Item</h2>
      {/* <pre>{JSON.stringify()}</pre> */}
      <form onSubmit={addItem}>
        <input type='text' value={description} placeholder='Description' onChange={handleDescription} />
        <input type='text' value={image_url} placeholder='Image Url' onChange={handleImageUrl} />
        <input type='submit' value='Add New Item' />
      </form>
      
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
                          <button onClick={() => deleteItem(item.id)} style={{cursor: 'pointer'}}>Delete</button>
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
