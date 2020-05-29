import {Dimensions} from "react-native";

const isPortrait = () => {
    const dimensions = Dimensions.get('screen');
    return dimensions.height > dimensions.width
};

const isLandScape = () => {
    const dimensions = Dimensions.get('screen');
    return dimensions.width > dimensions.height
};

const msp = (dim: any, limit: any) => {
    return (dim.scale * dim.width) >= limit || (dim.scale * dim.height) >= limit
};

const isTablet = () => {
    const dim = Dimensions.get("screen");
    return ((dim.scale < 2 && msp(dim, 1000)) || (dim.scale >= 2 && msp(dim, 1900)))
};

const isPhone = () => {
    return !isTablet()
};

export default {
    isPortrait,
    isLandScape,
    isPhone,
    isTablet
}
