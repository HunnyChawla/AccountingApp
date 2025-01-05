import React from "react";
import PropTypes from "prop-types";

const Layout = ({ rows, columns, children }) => {
  return (
    <div
      className={`grid gap-4`}
      style={{
        gridTemplateRows: `repeat(${rows}, minmax(100px, auto))`,
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
      }}
    >
      {React.Children.map(children, (child, index) => {
        const fullWidth = child.props.fullWidth ? `col-span-${columns}` : "";
        return (
          <div className={`p-4 rounded ${fullWidth}`} key={index}>
            {child}
          </div>
        );
      })}
    </div>
  );
};

Layout.propTypes = {
  rows: PropTypes.number.isRequired,
  columns: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

export default Layout;
