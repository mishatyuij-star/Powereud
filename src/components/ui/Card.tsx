/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  bordered?: boolean;
  shadow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  bordered = true,
  shadow = true,
  ...props
}) => {
  return (
    <div
      className={`bg-white rounded-3xl p-6 ${bordered ? 'brutal-border' : ''} ${shadow ? 'brutal-shadow' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
