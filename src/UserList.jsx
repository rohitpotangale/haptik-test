import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';

function UserList() {
    const [userList, setUserList] = useState([]);
    const [userListBkp, setUserListBkp] = useState([]);
    const [name, setName] = useState('');

    const handleInput = (e)=>{
        setName(e.target.value);

        let newListClone = [...userListBkp]
        if(!!e.target.value){

            const newList = newListClone.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase()));
            setUserList(getSortedData(newList));
        }else{
            setUserList(getSortedData(newListClone));
        }
       
    }
 
    const getSortedData = (list)=>{ 
        let userTrue = list.filter((u)=>u.isFavorite ==true);
        let userFalse = list.filter((u)=>u.isFavorite ==false);

        // list.sort(function(x, y) {
        //     return (x.isFavorite === y.isFavorite)? 0 : x? -1 : 1;
  
        // });
        return [...userTrue, ...userFalse];
    }
    const pushDataToUsers =(e)=>{
        if (e.which == 13 || e.keyCode == 13) {
       if(name.trim()==''){
           window.alert("Please Enter name");
           return false;
       }
        const obj ={
            id: Math.random(),
            name: name,
            isFavorite: false,
        }
        const newUserList = [...userListBkp, {...obj} ];
        setUserList(getSortedData(newUserList));
        setUserListBkp(newUserList);
        setName('');
    }
    }

    const setIsFavorite = (id)=>{
        const newList = userList.map((item) => {
            if (item.id === id) {
              const updatedItem = {
                ...item,
                isFavorite: !item.isFavorite,
              };
       
              return updatedItem;
            }
       
            return item;
          });

        setUserList(getSortedData(newList));
    }

    const deleteUser = (id)=>{
        const newList = userList.filter((item) => item.id !==id);
            setUserList(getSortedData(newList));
    }

  return (
    <div className="userlist">
        <span>UserList</span>

        <div className="friend-list">
                <ul>
                <li className="title-li">
                    <span className="title">Friends List</span></li>
                <li className="input-field-li">
                    <input name="add name" className="input-field" 
                    placeholder="Enter your friend's name" 
                    onChange={handleInput}
                    value={name}
                    onKeyPress={pushDataToUsers}>
                        </input></li>

                        {userList.map((u)=>{
                            return (
                                <li className="user-li">
                                    <div className="userDetails">
                                        <div className="userDetails-name-div">
                                        <span className="userDetails-name">{u.name}</span><br/>
                                        <span className="userDetails-info">is your friend</span>
                                        </div>
                                        <div className="userDetails-f-d-div">
                                            {u.isFavorite ? 
                                            <span className="star-icon" onClick={()=>setIsFavorite(u.id)}>&#9733;</span> :
                                            <span className="star-icon" onClick={()=>setIsFavorite(u.id)}>&#9734;</span>}

                                <i style={{fontSize:'24px'}} className="fa star-icon" 
                                onClick={()=>deleteUser(u.id)}>&#xf014;</i>
                                    
                                        </div>
                                          
                                    </div>
                               
                                </li>
                            )
                        })}
                </ul>
        </div>
    </div>
  );
}

export default UserList;
