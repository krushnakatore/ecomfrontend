import React, { useState } from 'react';

export const CategoryForm = ({
  handleCreateCategaory,
  setNewCategory,
  newCategory,
}) => {
  return (
    <div>
      <form onSubmit={handleCreateCategaory}>
        <div className="form-group w-75">
          <input
            type="text"
            className="form-control"
            value={newCategory}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Category Name"
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    </div>
  );
};
