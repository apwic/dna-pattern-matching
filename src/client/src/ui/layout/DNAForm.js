import { Box, Flex, Spacer, Heading, Image, position } from "@chakra-ui/react";

import React, { Component, useState, useRef } from "react";
import {
  Textbox,
  Textarea,
  Radiobox,
  Select
} from "react-inputs-validation";
import "react-inputs-validation/lib/react-inputs-validation.min.css";
import "./Styles.css";
import "./DNATest.css";
import FileUploader from "../../components/FileUpload";
import styled from 'styled-components';
import apiClient from "../.././http-common.js";

// Style Button
const Button = styled.button`
  /* Insert your favorite CSS code to style a button */
    background-color: #012B39;
    border-radius: 13px;
    padding: 5px;
    border: 2px solid #012B39;
    text-align: center;
    text-color: #FFFFFF;
    font-size: 10pt;
    font-weight: bold;
    letterSpacing: 2pt;
    color: #FFFFFF;
    margin: 4px 3px;
  `;

const technique_list = [
  { id: "KMP", name: "KMP" },
  { id: "Bayer-Moore", name: "Bayer-Moore" }
];

const disease_list = [
  { id: "", name: "Select a disease" },
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
      // dnasequence: "",
      filename : '',
      setUploadedFile : ({}),
      disease: "",
      technique: "",
      fileContent: "",
      diseaseList : [{ id: "", name: "Select a disease" }],
      hasNameError: true,
      hasDnaSeqError: true,
      hasFileError: true,
      hasDiseaseError: true,
      hasTechniqueError:true,
      validate: false,
    };
    this.validateForm = this.validateForm.bind(this);
    // this.update = this.update.bind(this);
    // const hiddenFileInput = useRef(null);
  }

  formatResponse(res) {
    return JSON.stringify(res, null, 2);
  }

  formatedTimestamp() {
    const d = new Date()
    const date = d.toISOString().split('T')[0];
    const time = d.toTimeString().split(' ')[0];
    return `${date} ${time}`
  }

  async updateDiseaseList(e) {
    try{
      const response = await apiClient.get('penyakit/get-penyakit');
      const result = {
        status: response.status + "-" + response.statusText,
        headers: response.headers,
        data: response.data
      };

      const data = result.data;
      console.log(data);
      for(let i=0; i<data.length; i++){
        this.state.diseaseList.push({id: data[i].NamaPenyakit, name: data[i].NamaPenyakit});
      }
      // setGetResult(formatResponse(result));
    } catch (err) {
      // setGetResult(formatResponse(err.response?.data || err));
      console.log(err.response?.data || err);
    }
  }

  async createDNATest(e) {
    try{
      let response;
      if (this.state.technique === "KMP") {
        response = await apiClient.post('dnatest/create-tes-dna-kmp', {
          namapengguna: this.state.name,
          penyakit: this.state.disease,
          sekuens: this.state.fileContent,
          tanggal: this.formatedTimestamp(),
        });
      } else {
        response = await apiClient.post('dnatest/create-tes-dna-bm', {
          namapengguna: this.state.name,
          penyakit: this.state.disease,
          sekuens: this.state.fileContent,
          tanggal: this.formatedTimestamp(),
        });
      }
      const result = {
        status: response.status + "-" + response.statusText,
        headers: response.headers,
        data: response.data
      };
      console.log(result);
    } catch (err) {
      console.log(err.response?.data || err);
    }
  }


  // handleClick = event => {
  //   hiddenFileInput.current.click();
  // };

  handleChange = event => {
    let fileUploaded = event.target.files[0];
    let filename = fileUploaded.name;
    let reader = new FileReader();
    let formData = new FormData();
    let hasFileError = this.state;
    let pattern = /^[ACGT]+$/g;

    formData.append('file', fileUploaded);

    reader.readAsText(fileUploaded);
    reader.onload = () => {
      let result = reader.result.match(pattern);
      if (result != null && result[0].length == reader.result.length){
        this.setState({fileContent : reader.result});
        this.setState({hasDnaSeqError : false});
      }
    }
    if (filename !== '') {
      hasFileError = false;
    }

    reader.onerror = () => {
      console.log(reader.error);
      hasFileError = false;
    }

  };

  toggleValidating(validate) {
    this.setState({ validate });
  }

  validateForm(e) {
    e.preventDefault();
    this.toggleValidating(true);
    const { hasNameError, hasDiseaseError, hasTechniqueError, hasDnaSeqError } = this.state;
    if (!hasNameError && !hasDiseaseError && !hasTechniqueError && !hasDnaSeqError) {
      alert("All validated!");
      this.createDNATest(e);
    } else {
      alert("Please fill all the required fields correctly!");
    }
  }

  state = {
      open: false
    };

  render() {
    const { name, disease, technique, validate, open } = this.state;
    // const hiddenFileInput = null;

    return (
      <div
        style={{
          padding: "5px",
        }}
      >
        
        <form onSubmit={this.validateForm}>
        
        <Box fontWeight={"bold"} fontSize="15pt" marginBottom={"1vh"} letterSpacing="1pt">
                  Name
                </Box>
                <div>
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
                      customStyleInput={{
                        border:"2px solid #BBC8D4", 
                        borderRadius:"15px", 
                        padding:"0.5px", 
                        width:"100%", 
                        minWidth:"20vw", 
                        maxWidth:"20vw",
                        height:"100%",
                        minHeight:"7vh",
                        maxHeight:"7vh",
                        textAlign:"center",
                        fontSize:"12pt",
                      }} // Optional.[Object].Default: {}.
                      customStyleWrapper={{}} // Optional.[Object].Default: {}.
                      customStyleContainer={{
                        // width: "100%",
                        // minWidth: "15vw",
                        // maxWidth: "15vw",
                      }} // Optional.[Object].Default: {}.
                      onChange={(name, e) => {
                        this.setState({ name });
                        console.log(e);
                      }} // Required.[Func].Default: () => {}. Will return the value.
                      onBlur={(e) => {
                        console.log(e);
                      }} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                      validationOption={{
                        name: "Name", // Optional.[String].Default: "". To display in the Error message. i.e Please enter your ${name}.
                        check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                        required: true // Optional.[Bool].Default: true. To determin if it is a required field.
                      }} 
                      style={{
                    }}
                    />
                </div>

                <Box fontWeight={"bold"} fontSize="15pt" marginBottom={"1vh"} marginTop={"3vh"} letterSpacing="1pt">
                  Prediction
                </Box>
                <div style={{margin:"0 0 2vw 35vw"}}>
                    <Select
                      attributesWrapper={{}}
                      attributesInput={{
                        id: "disease",
                        name: "disease"
                      }}
                      value={disease} // Optional.[String].Default: "".
                      disabled={false} // Optional.[Bool].Default: false.
                      showSearch={true}
                      validate={validate} // Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at onece, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
                      validationCallback={(res) =>
                        this.setState({ hasDiseaseError: res, validate: false })
                      } // Optional.[Func].Default: none. Return the validation result.
                      optionList={this.state.diseaseList} // Required.[Array of Object(s)].Default: [].
                      classNameSelect="" // Optional.[String].Default: "".
                      classNameWrapper="" // Optional.[String].Default: "".
                      classNameContainer="" // Optional.[String].Default: "".
                      classNameOptionListContainer="" // Optional.[String].Default: "".
                      classNameOptionListItem="" // Optional.[String].Default: "".
                      customStyleSelect={{
                        fontSize:"12pt",
                        textAlign:"center",
                        width:"100%",
                        minWidth:"20vw",
                        maxWidth:"20vw",
                      }} // Optional.[Object].Default: {}.
                      customStyleWrapper={{
                        fontSize:"12pt",
                        textAlign:"center",
                        width:"100%",
                        minWidth:"20vw",
                        maxWidth:"20vw",
                      }} // Optional.[Object].Default: {}.
                      customStyleContainer={{
                        // width: "100%",
                        // minWidth: "200px",
                        // maxWidth: "200px",
                        border:"2px solid #BBC8D4", 
                        borderRadius:"20px",
                        padding:"0.5px", 
                        width:"100%", 
                        minWidth:"20vw", 
                        maxWidth:"20vw",
                        height:"100%",
                        minHeight:"5vh",
                        maxHeight:"5vh",
                        fontSize:"12pt",
                        textAlign:"center"
                        
                      }} // Optional.[Object].Default: {}.
                      customStyleOptionListContainer={{
                        // overflow: "auto",
                        fontSize:"12pt",
                        textAlign:"center",
                        width:"100%",
                        minWidth:"20vw",
                        maxWidth:"20vw",
                      }} // Optional.[Object].Default: {}.
                      customStyleOptionListItem={{
                        fontSize:"12pt",
                        textAlign:"center",
                        width:"100%",
                        minWidth:"20vw",
                        maxWidth:"20vw",
                      }} // Optional.[Object].Default: {}.
                      onChange={(res, e) => {
                        this.updateDiseaseList(e);
                        this.setState({ disease: res.id });
                        console.log(e);
                      }} // Optional.[Func].Default: () => {}. Will return the value.
                      onBlur={() => {}} // Optional.[Func].Default: none. In order to validate the value on blur, you MUST provide a function, even if it is an empty function. Missing this, the validation on blur will not work.
                      validationOption={{
                        name: "Disease", // Optional.[String].Default: "". To display in the Error message. i.e Please select a ${name}.
                        check: true, // Optional.[Bool].Default: true. To determin if you need to validate.
                        required: true // Optional.[Bool].Default: true. To determin if it is a required field.
                      }}
                      style={{
                    }}
                    />
                </div>
          

          <Box fontWeight={"bold"} fontSize="15pt" marginBottom={"1vh"} letterSpacing="1pt">
            DNA Sequence
          </Box>
          {/* border:"2px solid #BBC8D4", */}
          <div align="center" justifyContent="center" style={{ borderRadius:"15px", padding:"0.1px", width:"100%", minWidth:"18vw", maxWidth:"18vw", height:"100%", minHeight:"7vh", maxHeight:"7vh"}}>
            {/* {this.state.filename}
            <Button>
              Upload
            </Button> */}
            <input type="file"
                  accept=".txt"
                  id="customFile"
                  onChange={this.handleChange}
                  style={{ width:"100%", minWidth:"16vw", maxWidth:"16vw"}}
            />
          </div>

          <Box marginTop= {"3vh"} align = "Center">
              <Box fontWeight={"bold"} fontSize="15pt" marginBottom={"1vh"} letterSpacing="1pt">
                Technique
              </Box>
              <div>
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
                    justifyContent: "center",
                    align: "center",
                  }} // Optional.[Object].Default: {}.
                  customStyleOptionListItem={{ marginLeft: "50vh", marginRight: "50vh" }} // Optional.[Object].Default: {}.
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
          </Box>

        <div style={{ height: "10px" }} />
        <div
          className={`my-button my-button__blue save-button`}
          onClick={this.validateForm} align="Center" style={{ marginTop: "5vh", maxWidth: "20vh", borderRadius: "15px", fontWeight: "bold", letterSpacing: "1px" }}
        >
          Submit
        </div>
        <input type="submit" style={{ display: "none" }} />
          
        </form>
      </div>
    );
  }
}

export default DNAForm;