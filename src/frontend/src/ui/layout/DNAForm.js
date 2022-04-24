import React, { Component } from "react";
import {
  Textbox,
  Textarea,
  Radiobox,
  Checkbox,
  Select
} from "react-inputs-validation";
import "react-inputs-validation/lib/react-inputs-validation.min.css";
import "./Styles.css";

const technique_list = [
    { id: "KMP", name: "KMP" },
    { id: "Bayer-Moore", name: "Bayer-Moore" }
  ];
  
  const disease_list = [
    { id: "HIV", name: "HIV" },
    { id: "Penyakit1", name: "Penyakit1" },
    { id: "Penyakit2", name: "Penyakit2" },
    { id: "Penyakit3", name: "Penyakit3" },
    { id: "Penyakit4", name: "Penyakit4" },
    { id: "Penyakit5", name: "Penyakit5" },
    { id: "Penyakit6", name: "Penyakit6" },
    { id: "Penyakit7", name: "Penyakit7" },
    { id: "Penyakit8", name: "Penyakit8" }
  ];
  
  class DNAForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",
        dnasequence: "",
        disease: "",
        technique: "",
        hasNameError: true,
        hasDnaseqError: true,
        hasDiseaseError: true,
        hasTechniqueError:true,
        validate: false
      };
      this.validateForm = this.validateForm.bind(this);
    }
  
    toggleValidating(validate) {
      this.setState({ validate });
    }
  
    validateForm(e) {
      e.preventDefault();
      this.toggleValidating(true);
      const { hasNameError, hasDnaseqError, hasDiseaseError, hasTechniqueError } = this.state;
      if (!hasNameError && !hasDnaseqError && !hasDiseaseError && !hasTechniqueError) {
        alert("All validated!");
      }
    }
  
    render() {
      const { name, dnasequence, disease, technique, validate } = this.state;
      const rowStyle = {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        padding: "2%",
        fontSize: "14px"
      };
      const rowWrapperStyle = {
        display: "table",
        width: "100%"
      };
      const rowContainerStyle = {
        display: "table-cell",
        verticalAlign: "middle",
        borderBottom: "1px solid #e5e5e5"
      };
      const labelStyle = {
        display: "inline-block"
      };
      const labelContentStyle = {
        verticalAlign: "middle"
      };
  
      return (
        <div
          style={{
            minHeight: "1000px",
            padding: "10px",
            border: "1px solid #e5e5e5"
          }}
        >
          
          <form onSubmit={this.validateForm}>
            <div style={rowWrapperStyle}>
              <div style={rowContainerStyle}>
                <div style={rowStyle}>
                  <div
                    style={{ ...labelStyle, flex: "3 3 0px", marginTop: "3px" }}
                  >
                    <span
                      className="icon icon-person"
                      style={{ ...labelContentStyle, fontSize: "20px" }}
                    />
                    &nbsp;
                    <span style={labelContentStyle}>Name</span>
                  </div>
                  <div style={{ flex: "6 6 0px" }}>
                    <Textbox
                      attributesWrapper={{}}
                      attributesInput={{
                        id: "Name",
                        name: "Name",
                        type: "text",
                        placeholder: "Write Your Name Here!"
                      }}
                      value={name} // Optional.[String].Default: "".
                      disabled={false} // Optional.[Bool].Default: false.
                      validate={validate} // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                      validationCallback={(res) =>
                        this.setState({ hasNameError: res, validate: false })
                      } // Optional.[Func].Default: none. Return the validation result.
                      classNameInput="" // Optional.[String].Default: "".
                      classNameWrapper="" // Optional.[String].Default: "".
                      classNameContainer="" // Optional.[String].Default: "".
                      customStyleInput={{}} // Optional.[Object].Default: {}.
                      customStyleWrapper={{}} // Optional.[Object].Default: {}.
                      customStyleContainer={{}} // Optional.[Object].Default: {}.
                      onChange={(name, e) => {
                        this.setState({ name });
                        console.log(e);
                      }} // Required.[Func].Default: () => {}. Will return the value.
                      onBlur={(e) => {
                        console.log(e);
                      }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                      // onFocus={(e) => {console.log(e);}} // Optional.[Func].Default: none.
                      // onClick={(e) => {console.log(e);}} // Optional.[Func].Default: none.
                      validationOption={{
                        name: "Name", // Optional.[String].Default: "". To display in the Error message. i.e Please enter your ${name}.
                        check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                        required: true // Optional.[Bool].Default: true. To determin if it is a required field.
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
  
            <div style={rowWrapperStyle}>
              <div style={rowContainerStyle}>
                <div style={rowStyle}>
                  <div
                    style={{ ...labelStyle, flex: "3 3 0px", marginTop: "3px" }}
                  >
                    <span
                      className="icon icon-bookmark"
                      style={{ ...labelContentStyle, fontSize: "20px" }}
                    />
                    &nbsp;
                    <span style={labelContentStyle}>Disease</span>
                  </div>
                  <div style={{ flex: "6 6 0px" }}>
                    <Select
                      attributesWrapper={{}}
                      attributesInput={{
                        id: "country",
                        name: "country"
                      }}
                      value={disease} // Optional.[String].Default: "".
                      disabled={false} // Optional.[Bool].Default: false.
                      showSearch={true}
                      validate={validate} // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                      validationCallback={(res) =>
                        this.setState({ hasDiseaseError: res, validate: false })
                      } // Optional.[Func].Default: none. Return the validation result.
                      optionList={disease_list} // Required.[Array of Object(s)].Default: [].
                      classNameSelect="" // Optional.[String].Default: "".
                      classNameWrapper="" // Optional.[String].Default: "".
                      classNameContainer="" // Optional.[String].Default: "".
                      classNameOptionListContainer="" // Optional.[String].Default: "".
                      classNameOptionListItem="" // Optional.[String].Default: "".
                      customStyleSelect={{}} // Optional.[Object].Default: {}.
                      customStyleWrapper={{}} // Optional.[Object].Default: {}.
                      customStyleContainer={{}} // Optional.[Object].Default: {}.
                      customStyleOptionListContainer={{
                        maxHeight: "200px",
                        overflow: "auto",
                        fontSize: "14px"
                      }} // Optional.[Object].Default: {}.
                      customStyleOptionListItem={{}} // Optional.[Object].Default: {}.
                      onChange={(res, e) => {
                        this.setState({ disease: res.id });
                        console.log(e);
                      }} // Optional.[Func].Default: () => {}. Will return the value.
                      onBlur={() => {}} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                      validationOption={{
                        name: "Disease", // Optional.[String].Default: "". To display in the Error message. i.e Please select a ${name}.
                        check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                        required: true // Optional.[Bool].Default: true. To determin if it is a required field.
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
  
            <div style={rowWrapperStyle}>
              <div style={rowContainerStyle}>
                <div style={rowStyle}>
                  <div
                    style={{ ...labelStyle, flex: "3 3 0px", marginTop: "3px" }}
                  >
                    <span
                      className="icon icon-person"
                      style={{ ...labelContentStyle, fontSize: "20px" }}
                    />
                    &nbsp;
                    <span style={labelContentStyle}>DNA Sequence</span>
                  </div>
                  <div style={{ flex: "6 6 0px" }}>
                    <Textarea
                      attributesWrapper={{}}
                      attributesInput={{
                        id: "dnasequence",
                        name: "dnasequence",
                        placeholder: "Write your DNA Sequence Here!"
                      }}
                      value={dnasequence} // Optional.[String].Default: "".
                      disabled={false} // Optional.[Bool].Default: false.
                      placeholder="Write your DNA Sequence Here!" // Optional.[String].Default: "".
                      validate={validate} // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                      validationCallback={(res) =>
                        this.setState({
                          hasDnaseqError: res,
                          validate: false
                        })
                      } // Optional.[Func].Default: none. Return the validation result.
                      classNameInput="" // Optional.[String].Default: "".
                      classNameWrapper="" // Optional.[String].Default: "".
                      classNameContainer="" // Optional.[String].Default: "".
                      customStyleInput={{}} // Optional.[Object].Default: {}.
                      customStyleWrapper={{}} // Optional.[Object].Default: {}.
                      customStyleContainer={{}} // Optional.[Object].Default: {}.
                      onChange={(dnasequence, e) => {
                        this.setState({ dnasequence });
                        console.log(e);
                      }} // Required.[Func].Default: () => {}. Will return the value.
                      onBlur={(e) => {
                        console.log(e);
                      }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                      // onFocus={(e) => {console.log(e);}} // Optional.[Func].Default: none.
                      // onClick={(e) => {console.log(e);}} // Optional.[Func].Default: none.
                      validationOption={{
                        name: "DNA Sequence", // Optional.[String].Default: "". To display in the Error message. i.e Please enter your ${name}.
                        check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                        required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
                        type: "string", // Optional.[String].Default: "string". Validation type, options are ['string', 'number'].
                        reg: /^[ACGT]+$/g,
                        regMsg: "DNA Sequence must be composed of A, C, G, T"
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div style={rowWrapperStyle}>
            <div style={rowContainerStyle}>
              <div style={rowStyle}>
                <div
                  style={{ ...labelStyle, flex: "3 3 0px", marginTop: "3px" }}
                >
                  {/*<div style={(labelStyle, { flex: '3 3 0px' })}>*/}
                  <span
                    className="icon icon-info"
                    style={{ ...labelContentStyle, fontSize: "20px" }}
                  />
                  &nbsp;
                  <span style={labelContentStyle}>Technique</span>
                </div>
                <div style={{ flex: "6 6 0px", display: "flex" }}>
                  <Radiobox
                    attributesWrapper={{}}
                    attributesInputs={[
                      { id: "tech-1", name: "tech-1" },
                      { id: "tech-2", name: "tech-2" }
                    ]}
                    disabled={false} // Optional.[Bool].Default: false.
                    value={technique} // Optional.[String].Default: "".
                    validate={validate} // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                    validationCallback={res =>
                      this.setState({ hasTechniqueError: res, validate: false })
                    } // Optional.[Func].Default: none. Return the validation result.
                    optionList={technique_list}
                    classNameInput="" // Optional.[String].Default: "".
                    classNameWrapper="" // Optional.[String].Default: "".
                    classNameContainer="" // Optional.[String].Default: "".
                    classNameOptionListItem="" // Optional.[String].Default: "".
                    customStyleInput={{}} // Optional.[Object].Default: {}.
                    customStyleWrapper={{}} // Optional.[Object].Default: {}.
                    customStyleContainer={{
                      display: "flex",
                      justifyContent: "flex-start"
                    }} // Optional.[Object].Default: {}.
                    customStyleOptionListItem={{ marginRight: "20px" }} // Optional.[Object].Default: {}.
                    onChange={(technique, e) => {
                      this.setState({ technique });
                      console.log(e);
                    }} // Required.[Func].Default: () => {}. Will return the value.
                    onBlur={e => {
                      console.log(e);
                    }} // Optional.[Func].Default: none.
                    // onFocus={(e) => {console.log(e);}} // Optional.[Func].Default: none.
                    // onClick={(e) => {console.log(e);}} // Optional.[Func].Default: none.
                    validationOption={{
                      name: "Name", // Optional.[String].Default: "". To display in the Error message. i.e Please enter your ${name}.
                      check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                      required: true // Optional.[Bool].Default: true. To determin if it is a required field.
                      // showMsg: true, // Optional.[Bool].Default: true. To determin display the error message or not.
                      // locale: 'en-US', // Optional.[String].Default: "en-US". For error message display. Current options are ['zh-CN', 'en-US']; Default is 'en-US'.
                      // msgOnError: "Your custom error message if you provide the validationOption['msgOnError']", // Optional.[String].Default: "". Show your custom error message no matter what when it has error if it is provied.
                      // msgOnSuccess: "Your custom success message if you provide the validationOption['msgOnSuccess']. Otherwise, it will not show, not even green border." // Optional.[String].Default: "". Show your custom success message no matter what when it has error if it is provied.
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
  
            <div style={{ height: "10px" }} />
            <div
              className={`my-button my-button__red save-button`}
              onClick={this.validateForm}
            >
              validate!
            </div>
            <input type="submit" style={{ display: "none" }} />
          </form>
        </div>
      );
    }
  }

export default DNAForm;