import React from 'react'
import style from './css/Landing.module.css'

export default function Docs() {
  return (
    <div>
        <div className={`${style.navbar} ${style.clear} ${style.navTop}`}>
        <div className="row content">
            <a href="#"><img className="logo" src="logo.png"/></a>
            <a className="right" style="" href="#"><i className="fas fa-book"></i>&nbsp; Documentation</a>
         
        </div>
    </div>

    <div className="container clear">
        <div className="row wrapper">

            <div className="sidepanel">

                <a className="title" href="#">Introduction</a>
                
                <a className="section" href="#">About this App</a>
              

                <div className="divider left"></div>

                <a className="title" href="#gettingstarted">Getting Started</a>

                <a className="section" href="#stoolsampleimages">Stool Sample Images</a>
                 <a className="section" href="#cca01">CCA-01 Forms</a>

                <div className="divider left"></div>

                <a className="title" href="#basicfeatures">Diagnosis Features</a>

                <a className="section" href="#basicfeatures">Stool Sample Diagnosis</a>
                <a className="section" href="#basicfeatures">CCA-01 Form Diagnosis</a>
     

                <div className="divider left"></div>

                <a className="title" href="#research">Research</a>

                <a className="section" href="#research">Phase 1.1</a>
                <a className="section" href="#1.2">Phase 1.2</a>
                <a className="section" href="#2.1">Phase 2.1</a>
                
                <a className="section" href="#2.2">Phase 2.2</a>

              
            
             <div className="space double"></div>

            </div>

            <div className="right-col">
            


                <h1 >Introduction</h1>
                
                <p>BiDEx is an online web application which users can use to assess <i>Opisthorchis viverrini</i> infections
                from stool sample images and online CCA-01 forms.</p> 

                <h2>About this App</h2>
                
                <p id="technology">BiDEx was designed to be used for proactive <i>Opisthorchis viverrini</i>(Ov) infection assessment,
                to increase speed of diagnosing using artificial intelligence instead of humans to look for Ov eggs in stool samples.
                If Ov eggs are not found in the stool sample, it is possible to use our clustering neural network model on CCA-01 forms to assess patient's possibility of
                 having Ov infections.</p>

                

                <p id="gettingstarted"></p> 
                 
        <div className="divider" style="width:24%; margin:30px 0;" id="stoolsampleimages"></div>

                <h1 id="cca01">Getting Started</h1>

                <p>
                    For diagnosis, users may use either stool sample images or CCA-01 forms to assess Ov infection risk.
                    <br>Users must also have an account to use our diagnosis functions.</br>
                </p> 

                <h2>Stool Sample Images</h2>
                
                <p>Normally, to determine whether a patient is infected with Ov fluke or not, doctors and parasitologists search for Ov eggs in stool samples.
                    If the patient is found with Ov eggs without blemish, they are almost instantly diagnosed with Ov infection. More information on stool sample images can
                    be found in the Diagnosis Feature section.
                </p> 

                <h2>CCA-01 Forms</h2>
                
                <p>Another way to diagnose Ov infections using BiDEx is to use CCA-01 forms. These forms ask questions which relate to Ov infections
                    will be assessed by our own AI model after being submitted. These forms are provided on the web app and can be instantly
                    submitted to recieve patient diagnosis assessments immediately.
                </p>
                
                <p id="basicfeatures"></p>

                    
            <div className="divider" style="width:24%; margin:30px 0;"></div>
            
            
                <h1>Diagnosis Features</h1>

                <h2>Stool Sample Diagnosis</h2>
                
                <p id="basicfeatures">Stool sample diagnosis is normally diagnosed by finding Ov eggs in a patient's stool sample with a microscope. BiDEx instead uses our own 
                    Ov egg detection algorithm, including an AI model, to detect Ov eggs from stool samples instead.
                    To use this diagnosis method, users must have images from a patient's stool sample ready.
                    <br> Images to be fed into the AI should have the following qualities:</br>
                    <br>- Be less than 1 megabyte in size per image</br>
                    <br>- Be taken with at least 400X magnification</br>
                    <br>- Be taken from a microscope camera module</br>
                    <p><b>Important:</b> Please do not feed images which are not related to stool samples into our AI model.</p>
                </p>
                
                <h2 id="research">CCA-01 Form Diagnosis</h2>

                <p>CCA-01 forms are forms used by CASCAP, an organization in Thailand which diagnose Ov infections and cholangiocarcinoma. These forms can assess 
                    patients who are at risk for Ov infections, along with those who may have cholangiocarcinoma. The CCA-01 form is another alternative to Ov infection 
                    diagnosis. Information related to Ov infections will be asked for in the form, in which will be fed to BiDEx's own AI model be assessed for Ov infections.
                </p>
                
                
                
               
                 
               <p>
                
                </p>
                
                <div className="divider" style="width:24%; margin:5px;"></div>
                
                <h1>Research</h1>
                
                <h2>Phase 1.1</h2>
                
                <p id="1.2">In phase 1.1, the research team wanted to find the best object detection model that can identify Ov eggs. We tested out 3 
                    different models with different architectures. The entire dataset we used consisted of 300 images, split into 3 sets, 70% for training, 20% for validation, and 10% for testing. 
                    The experiment was performed 3 times, having tested each architecture thrice. The datasets used in each experiment was also mixed randomly before 
                    doing the experiment. We found that the model with the highest accuracy and speed used per image was 
                    YOLOv5. YOLOv5 had 95% accuracy when tested with our test set of 30 images, and used 8 seconds to process the 30 images.
                    But due to the lack negative datasets (images with other parasitic eggs) in our training set, our best model still detected artifacts and other similar-looking 
                    parasitic eggs as Ov eggs.
                <br/>
                
                </p>
                   
                
                <h2 id="2.1">Phase 1.2</h2>
                
                <p>Due to the problem found in phase 1.1, this phase focused on making our AI model not confuse similar-looking artifacts and eggs as Ov eggs.
                    Information was found on the physical characteristic of the Ov egg. The egg consists of having knobs on its shoulders, being about 30 × 12 micrometers 
                    in size, and having ovular contours. After finding these features, the team developed 3 algorithms to find each of the listed characteristics, combining them 
                    with the YOLOv5 model, creating an ensemble model with 98% accuracy. This better improves the model's ability to discern between unwanted artifacts and Ov eggs.
                
                <br/>
                </p>
                
                
                <h2>Phase 2.1</h2>
                  
                <p id="2.2">
                    During phase 2.1, the researchers created another neural network model with Partial Dependence Plots for 
                    decision analysis. This is because, in certain conditions, Ov eggs may not be found in the stool sample, though 
                    the patient is still at risk for Ov infection. The researchers wanted to find a way to help identify these types 
                    of people, so our own neural network model for assessing CCA-01 forms were made, as these forms are easier to obtain 
                    than stool samples. After training our model, and testing it with 2 other models, the researchers found that our model has the highest accuracy and fastest speed.
                </p>
                  
                  <h2>Phase 2.2</h2>
                  
                  <p>Since CASCAP wants to use an AI model of ours, we put both our AI models, our ensemble model with YOLOv5 and our CCA-01 form assessing 
                      neural network into a web app, called <a href="https://bidex.health/">bidex.health</a>, creating a screening system. The researchers soon found 
                      that the screening system, specifically the stool sample screening part, was up to 83.33% faster than normal stool sample screening with humans in the 
                      right conditions. This indicates our tool, BiDEx, is able to help proactive diagnosis of Ov infectios, leading to decrease in mortality from cholangiocarcinoma 
                      in Asian countries in the end.
                  </p>
                  
                  
                 
                

            </div>

        </div>


    </div>
    </div>
  )
}
