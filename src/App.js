import TodoTemplate from "./components/TodoTemplate";
import "./App.scss";
import TodoInsert from "./components/TodoInsert";
import { useCallback, useEffect, useState } from "react";
import TodoList from "./components/TodoList";


const App = () => {
  //id, text, checked
  const [todos, setTodos] = useState(()=>{
    //초기값
    const load = localStorage.getItem('todos');
    return load ? JSON.parse(load) : [];
    // {id:1, text:"리액트의 기초 알아보기", checked:false},
    // {id:2, text:"컴포넌트 스타일링 해보기", checked:true},
});
  // const handleInsert = (value)=>{
  //   const todo = {id: Date.now(), text:value, checked:false};
  //   setTodos([...todos,todo]);
  // }
  const handleInsert = useCallback((value)=>{
    const todo = {id: Date.now(), text:value, checked:false};
    setTodos((prev)=>{ return [...prev,todo]});
  },[]);

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(todos));
  },[todos]);

  const handleChecked = (id) => {
    const toggle = todos.map( (list)=>{
      return (list.id === id) ? {...list,checked:!list.checked} : list;
    } )
    setTodos(toggle);
  }
    //// setTodos(
    ////   todos.map( (list)=>{
    ////     return list.id === id ? { ...list, checked:!list.checked} : list
    ////   } )
   //// );
  // }
  //callback으로 구현
  

  const handleDelete = (id) => {
    //id만 제외하고 todos 배열을 구성
    const result = todos.filter( (list)=>{
      return list.id !== id;
    } );
    setTodos(result);
  }
  return (
    <div className="app">
      
      <TodoTemplate>
      <TodoInsert onInsert={handleInsert}/>
      <TodoList todos={todos} onChecked={handleChecked} onRemove={handleDelete}/>
      </TodoTemplate>
      
      
    </div>
  );
};

export default App;