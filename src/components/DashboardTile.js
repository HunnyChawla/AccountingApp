import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaRupeeSign } from "react-icons/fa";
import { PiChartLineDownBold } from "react-icons/pi";
import { AiOutlineShoppingCart, AiOutlineMoneyCollect, AiOutlineLineChart, AiOutlineCloseCircle, AiTwotoneMoneyCollect } from 'react-icons/ai';

const iconMap = {
  'Total Orders': <AiOutlineShoppingCart size="3em"/>,
  'Total Sales': <AiOutlineMoneyCollect size="3em"/>,
  'Total Payments': <FaRupeeSign size="3em"/>,
  'Total Profit': <AiOutlineLineChart size="3em"/>,
  'Total Loss': <PiChartLineDownBold size="3em"/>,
};

const DashboardTile = ({ title, value, color, customIcon }) => {
  const tileStyle = {
    padding: '1rem',
    margin: '0.5rem',
    borderRadius: '8px',
    backgroundColor: color || '#f5f5f5',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const icon = customIcon || iconMap[title] || null;

  return (
    <div style={tileStyle}>
      {icon && (typeof icon === 'string' ? <FontAwesomeIcon icon={icon} size="10px" style={{ marginBottom: '0.5rem' }} /> : icon)}
      <h3>{title}</h3>
      <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{value}</p>
    </div>
  );
};

DashboardTile.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  color: PropTypes.string,
  customIcon: PropTypes.element, // Allowing custom React element as icon
};

export default DashboardTile;
