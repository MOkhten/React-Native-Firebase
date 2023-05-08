import React, { useState, useEffect } from "react";
import useRoute from "../router";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native"; 

const Main = () => {
    const [user, setUser] = useState(null);
    const routing = useRoute(user);
    const state = useSelector((state) => state);
    return <NavigationContainer>{routing}</NavigationContainer>
};

export default Main;