import React, { useState, useEffect } from 'react';

import { Dimensions } from "react-native";

interface DimensionsCallbackProp {
    screen: { width: number; height: number };
}

export function useScreenDimensions(): { width: number; height: number } {
    // Get initial dimensions and initialize state
    const initialDimensions = Dimensions.get("screen");
    const [width, setWidth] = useState(initialDimensions.width);
    const [height, setHeight] = useState(initialDimensions.height);

    useEffect(() => {
        const handleChange = ({ screen }: DimensionsCallbackProp) => {
            setWidth(screen.width);
            setHeight(screen.height);
        };

        // Listen for dimension changes, which typically indicates a rotation
        Dimensions.addEventListener("change", handleChange);

        // Cleanup
        // return () => {
        //     Dimensions.addEventListener("change", handleChange);
        // };
    });

    return { width, height };
}