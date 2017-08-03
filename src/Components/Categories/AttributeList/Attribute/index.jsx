import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import t from 'tcomb-form';
import { updateAttribute } from '../../../../actions/actions';
import { ERROR_DUPLICATED, NEW_ATTRIBUTE } from '../../../../config/strings';

const Form = t.form.Form;

const getValueFromProps = ({ attributeList, id }) => attributeList.find(
  currentAttribute => currentAttribute.id === id,
);

class FormWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    const value = getValueFromProps(props);
    this.state = {
      value,
    };
  }

  componentDidMount() {
    const value = this.state.value;
    if (value.errors[0] !== NEW_ATTRIBUTE) {
      this.onChange(value);
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      value: getValueFromProps(props),
    });
  }

  componentDidUpdate(prevProps) {
    // If we are coming onto this attribute from another, revalidate.
    const { currentAttributeId } = this.props;
    const { currentAttributeId: prevAttributeId } = prevProps;
    const value = this.state.value;
    if (currentAttributeId !== null && value.id === Number(currentAttributeId)) {
      if (currentAttributeId !== prevAttributeId) {
        this.onChange(value);
      }
    }
  }

  onChange(attribute) {
    this.props.onChange(attribute, this.props.attributeList, this.form);
  }

  render() {
    const { type, options } = this.props;
    const { value } = this.state;
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
  attributeList: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired,
  currentAttributeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

FormWrapper.defaultProps = {
  attributeList: [],
  currentAttributeId: null,
};

const onChange = (attribute, attributeList, dispatch, form) => {
  const validation = form.validate().errors.filter(
    e => e.message && e.message !== ERROR_DUPLICATED,
  );
  dispatch(updateAttribute(attribute, attributeList, validation));
};

const mapDispatchToProps = dispatch => ({
  onChange: (attribute, attributeList, form) => onChange(attribute, attributeList, dispatch, form),
});

const mapStateToProps = (state, props) => {
  const { currentAttributeId, attributeList, form } = state.attributes;
  const { options, type } = form;
  return {
    currentAttributeId,
    type,
    options,
    id: props.id,
    attributeList,
    ref: (localForm) => { this.form = localForm; },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormWrapper);
