import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import t from 'tcomb-form';
import { updateAttribute } from '../../../../actions/actions';
import { ERROR_DUPLICATED } from '../../../../config/strings';

const Form = t.form.Form;

const mapStateToProps = (state, ownProps) => {
  const attribute = state.attributes.attributeList.find(
    currentAttribute => currentAttribute.id === ownProps.id,
  );
  const { currentAttributeId, attributeList, form } = state.attributes;
  const { options, type } = form;
  return {
    currentAttributeId,
    type,
    options,
    value: attribute,
    attributeList,
    ref: (localForm) => { this.form = localForm; },
  };
};

const onChange = (attribute, attributeList, dispatch, form) => {
  const validation = form.validate().errors.filter(e => e.message && e.message !== ERROR_DUPLICATED);
  dispatch(updateAttribute(attribute, attributeList, validation));
};

const mapDispatchToProps = dispatch => ({
  onChange: (attribute, attributeList, form) => onChange(attribute, attributeList, dispatch, form),
});

class FormWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }
  componentDidUpdate(prevProps) {
    // If we are coming onto this attribute from another, revalidate.
    const { value, currentAttributeId } = this.props;
    if (Number(currentAttributeId) === value.id &&
      currentAttributeId !== prevProps.currentAttributeId) {
      this.onChange(value);
    }
  }

  onChange(attribute) {
    this.props.onChange(attribute, this.props.attributeList, this.form);
  }
  render() {
    const { type, options, value } = this.props;
    return (
      <Form
        onChange={this.onChange}
        type={type}
        options={options}
        value={value}
        ref={(form) => { this.form = form; }}
      />
    );
  }
}

FormWrapper.propTypes = {
  type: PropTypes.func.isRequired,
  options: PropTypes.shape({}).isRequired,
  value: PropTypes.shape({}).isRequired,
  attributeList: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired,
  currentAttributeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

FormWrapper.defaultProps = {
  attributeList: [],
  currentAttributeId: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormWrapper);
