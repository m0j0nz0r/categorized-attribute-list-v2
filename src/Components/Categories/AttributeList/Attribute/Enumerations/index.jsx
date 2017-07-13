import React from 'react';

export default (locals) => {
  console.log(locals, locals.add.click);
  const addItem = () => {
    const value = this.input.value;
    if (value) {
      locals.add.click();
    }
  };

  return (
    <div>
      <input ref={(input) => { this.input = input; }} type="string" />
      <button type={locals.add.type} onClick={addItem}>{locals.add.label}</button>
      <ul>
        {locals.items.map(i => <li key={i.key}>{i.input.value}</li>)}
      </ul>
    </div>
  );
};
