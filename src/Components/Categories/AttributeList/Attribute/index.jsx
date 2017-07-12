import { connect } from 'react-redux';
import t from 'tcomb-form';
import * as actions from '../../../../config/actions';

const Form = t.form.Form;

const getType = (state, ownProps, attribute) => {
  const name = t.refinement(t.Number, () => attribute.isDuplicated);
  name.getValidationErrorMessage = () => (attribute.isDuplicated ? 'Duplicated name' : '');

  const description = t.String;

  const deviceResourceType = t.enums({ 0: 'DefaultValue' });

  const defaultValue = t.String;

  const dataType = t.enums({
    string: 'String',
    object: 'Object',
  });

  const format = t.enums({
    none: 'None',
    number: 'Number',
    boolean: 'Boolean',
    dateTime: 'Date-Time',
    cdata: 'CDATA',
    uri: 'URI',
  });

  let optionalFields = {};

  if (attribute.dataType === 'string') {
    switch (attribute.format) {
      case 'none':
        optionalFields = {
          enumerations: t.list(t.String),
        };
        break;
      case 'number':
        optionalFields = {
          minRange: t.Number,
          maxRange: t.Number,
          unitOfMeasurement: t.String,
          precision: t.Number,
          accuracy: t.Number,
        };
        break;
      default:
        // Do nothing.
    }
  }
  return t.struct(Object.assign(
    {
      name,
      description,
      deviceResourceType,
      defaultValue,
      dataType,
      format,
    },
    optionalFields,
  ));
};

const mapStateToProps = (state, ownProps) => {
  const attribute = state.attributes.attributeList.find(
    currentAttribute => currentAttribute.id === ownProps.id,
  );
  return {
    type: getType(state, ownProps, attribute),
    options: state.attributes.form.options,
    value: attribute,
    ref: (form) => { this.form = form; },
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (value, path) => {
    if (this.form.getComponent(path)) {
      this.form.getComponent(path).validate();
    }
    return dispatch(actions.updateAttribute(ownProps.id, value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
