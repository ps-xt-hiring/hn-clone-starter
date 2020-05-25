import React from "react";
import News from "./components/News/News";
import Header from "./components/Header/Header";
import Slider  from "./components/Slider/Slider";
import InputSlider from "./components/SimpleSlider/SimpleSlider";
import InputBox from "./components/InputBox/InputBox";
import Search from "./components/SearchBox/SearchBox";

function App() {
  return (
      <div
    style={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}
    >
      {/* <Header /> */}
      <News />
      {/* <Slider /> */}
      {/* <Search /> */}
      {/* <InputBox /> */}
      {/* <InputSlider /> */}
    </div>
  );
}

export default App;
