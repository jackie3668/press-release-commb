import React from 'react';
import { BrowserRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import FormTemplate from './Components/FormTemplate';
import Forms from './Components/Forms';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/export' element={<Forms />}/>
        <Route path='*' element={<FormTemplate />}/>
        <Route path='/form' element={<FormTemplate />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
