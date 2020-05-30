import {Image} from "react-native";
import React from "react";
import PropTypes from "prop-types";

const propTypes = {
    style: PropTypes.shape({}),
    image: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number
};

const defaultProps = {
    style: null,
    width: null,
    height: null
};

const LazyImage = ({style,image, width, height}: {style:any, image: string; width: number; height: number }) => {
    return (
        <Image
            style={style}
            source={{
                uri: image,
                width: width, height: height
            }}
        />
    )
};

LazyImage.propTypes = propTypes;
LazyImage.defaultProps = defaultProps;

export default LazyImage;
