import { Box, Flex, Spacer, Heading, Image, position } from "@chakra-ui/react";
import React, { Component } from "react";
import {
  Textbox
} from "react-inputs-validation";
import "react-inputs-validation/lib/react-inputs-validation.min.css";
import "./Styles.css";
import "./DNATest.css";
import FileUploader from "../../components/FileUpload";

  
  class DiseaseForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: "",
        filename: '',
        fileContent: "",
        hasNameError: true,
        validate: false
      };
      this.validateForm = this.validateForm.bind(this);
    }
  
    toggleValidating(validate) {
      this.setState({ validate });
    }
    
    handleChange = event => {
      const fileUploaded = event.target.files[0];
      const filename = fileUploaded.name;
      const reader = new FileReader();
      const formData = new FormData();
      const hasFileError = this.state;
      formData.append('file', fileUploaded);
  
      reader.readAsText(fileUploaded);
      reader.onload = () => {
        this.setState({fileContent : reader.result});
        console.log(reader.result);
      }
      if (filename !== '') {
        hasFileError = false;
      }

      reader.onerror = () => {
        console.log(reader.error);
        hasFileError = false;
      }

    };

    validateForm(e) {
      e.preventDefault();
      this.toggleValidating(true);
      const { hasNameError } = this.state;
      if (!hasNameError) {
        alert("All validated!");
      }
    }

    state = {
        open: false
      };
    
    onOpenModal = () => {
    this.setState({ open: true });
    };

    onCloseModal = () => {
    this.setState({ open: false });
    };
  
    render() {
      const { name, validate, open } = this.state;
  
      return (
        <div
          style={{
            padding: "50px",
          }}
        >
          
          <form onSubmit={this.validateForm}>

          <Flex justifyContent={"center"} flexDirection="column">
            
            <div class="container">
                
                <div class="item" position="fixed" >             
                    <Box fontWeight={"bold"} fontSize="15pt" marginBottom={"1vh"} letterSpacing="1pt">
                        Disease
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
                            fontSize:"12pt"
                            }} 
                            customStyleWrapper={{}} // Optional.[Object].Default: {}.
                            customStyleContainer={{
                            // width: "100%",
                            // minWidth: "15vw",
                            // maxWidth: "15vw",
                            }} 
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
                            style={{
                        }}
                        />
                  </div>
                </div>   

                <Spacer size="lg"/>

                <div class="item" position="fixed"> 
                    <Box fontWeight={"bold"} fontSize="15pt" marginBottom={"1vh"} letterSpacing="1pt">
                        Sequence
                    </Box>

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
                </div>


            </div>
          </Flex>

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

export default DiseaseForm;