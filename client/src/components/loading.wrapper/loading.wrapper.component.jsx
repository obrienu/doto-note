import React from "react";
import "./loader.wrapper.style.css";

const LoadingWrapper = WrappedComponent => ({
  isLoading,
  error,
  ...otherProps
}) => {
  const Loader = (
    <div className="LoaderContainer">
      <div className="Loader"></div>
    </div>
  );

  const ErrorContainer = (
    <div className="LoaderContainer">
      <h1>{error}</h1>
    </div>
  );
  return isLoading ? (
    Loader
  ) : error ? (
    ErrorContainer
  ) : (
    <WrappedComponent {...otherProps} />
  );
};

export default LoadingWrapper;
