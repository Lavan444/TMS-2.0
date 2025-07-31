import React, {useState} from "react";
import { CascadeSelect } from "primereact/cascadeselect"
import { Dialog } from "primereact/dialog"
import { Col, Container, Row } from "reactstrap"
import { InputText } from "primereact/inputtext"
import { Dropdown } from "primereact/dropdown"
import { Calendar } from "primereact/calendar"
import { MultiSelect } from 'primereact/multiselect';
import { InputTextarea } from "primereact/inputtextarea"
import { Checkbox } from 'primereact/checkbox';
import { Chips } from 'primereact/chips';



const ScheduleInterview = () =>{

  const [selectedSchedule, setSelectedSchedule] = useState(null);



    const actScheduleOptions = [
        {
          name: 'Interview',
          code: 'SCH-IN',
          icon: 'pi pi-user',
          action: () => SetInterviewpop(true),
        },
        {
          name: 'Call',
          code: 'SCH-CA',
          icon: 'pi pi-phone',
          // action: () => SetInterviewpopCall(true),
          action: () => SetInterviewpop(true),
    
        },
        {
          name: 'Meeting',
          code: 'SCH-ME',
          icon: 'pi pi-calendar',
          // action: () => SetInterviewpopMeeting(true),
          action: () => SetInterviewpop(true),
    
    
        },
        {
          name: 'Task',
          code: 'SCH-TA',
          icon: 'pi pi-check-square',
          // action: () => SetInterviewpopTask(true),
          action: () => SetInterviewpop(true),
    
    
        },
        {
          name: 'Event',
          code: 'SCH-EV',
          icon: 'pi pi-bell',
          // action: () => SetInterviewpopEvent(true),
          action: () => SetInterviewpop(true),
    
    
        },
        {
          name: 'Other',
          code: 'SCH-OT',
          icon: 'pi pi-ellipsis-h',
          // action: () => SetInterviewpopOther(true),
          action: () => SetInterviewpop(true),
    
    
        }
      ];
    
      const handleScheduleChange = (e) => {
        setSelectedSchedule(e.value);
        setIntertype(e.value.name); // Update input field with selected name
      
        // Trigger the action if it exists
        if (e.value && e.value.action) {
          e.value.action();
        }
      };

    // interview popup starts
    
      // Popup dialog const values start
    
      const [interviewpop, SetInterviewpop] = useState(false)
      const [interviewpopCall, SetInterviewpopCall] = useState(false)
      const [interviewpopMeeting, SetInterviewpopMeeting] = useState(false)
      const [interviewpopTask, SetInterviewpopTask] = useState(false)
      const [interviewpopEvent, SetInterviewpopEvent] = useState(false)
      const [interviewpopOther, SetInterviewpopOther] = useState(false)
    
      // Popup dialog const values end
    const [intertype, setIntertype ] = useState()
    
      // const [intertype, setintertype] = useState()
      const [intertypeCall, setintertypeCall] = useState("Call")
      const [intertypeMeeting, setintertypeMeeting] = useState("Meeting")
      const [intertypeTask, setintertypeTask] = useState("Task")
      const [intertypeEvent, setintertypeEvent] = useState("Event")
      const [intertypeOther, setintertypeOther] = useState("Other")
    
    
    
    
      const [subtype, setSubtype] = useState(null)
      const [subtypeget, setsubtypeget] = useState(null)
      const [startdate, setStartdate] = useState(null)
      const [starttime, setStarttime] = useState(null)
      const [endtime, setendtime] = useState(null)
      const [enddate, setenddate] = useState(null)
      const [popTextares, setPopTextares] = useState("")
      const [priority, setPriority] = useState(null)
      const [prioritycontact, setprioritycontact] = useState(null)
      const [condidatevalu, setcondidatevalu] = useState([])
    
      const typeInterview = [
        { name: 'Inperson', value: 'Inperson' },
        { name: 'Audio', value: 'Audio' },
        { name: 'Video', value: 'Video' },
      ];
      const [reminder, setReminder] = useState(null);
      const reminderOptions = [
        { name: '0 mins', value: '0 mins' },
        { name: '5 mins', value: '5 mins' },
        { name: '10 mins', value: '10 mins' },
        { name: '15 mins', value: '15 mins' },
        { name: '30 mins', value: '30 mins' },
      ];
      const [repeat, setRepeat] = useState(null);
      const repeatOptions = [
        { name: 'Do not repeat', value: 'none' },
        { name: 'Daily', value: 'daily' },
        { name: 'Weekly', value: 'weekly' },
        { name: 'Mon-Fri', value: 'mon-fri' },
      ];
    
      const [followup, setFollowup] = useState(null);
    
      // Dropdown options
      const followupOptions = [
        { name: 'None', value: 'none' },
        { name: '1 Day', value: '1 Day' },
        { name: '2 Days', value: '2 Day' },
        { name: '3 Days', value: '3 Day' },
      ];

    //   const typeInterview = [
    //     { name: 'Inperson', value: 'inperson' },
    //     { name: 'Audio', value: 'Audio' },
    //     { name: 'Video', value: 'Video' },
    //   ];
    
      const typeInterviewval = [
        { name: 'Open', value: 'Open' },
        { name: 'Closed', value: '1 Day' },
        { name: 'On Hold', value: '2 Day' },
        // { name: '3 Days', value: '3 Day' },
    
    ]

    const typeInterviewcontact = [
        { name: 'Harish', value: 'Harish' },
        { name: 'Giri', value: 'Giri' },
        { name: 'Pavan', value: 'Pavan' },
    ]
    
    
    
      // const [typeInterviewval, settypeInterviewval] = useState([])
      // const [typeInterviewcontact, settypeInterviewcontact] = useState([])
      const [typeInterviewcondi, settypeInterviewcondi] = useState([])
      const [subjectval, setsubjectval] = useState(null)
      const [popchecked2, setPopchecked2] = useState(false)
      const handlePopupCheckbox2 = e => {
        setPopchecked2(e.checked)
      }
    
      const [userid, setUserid] = useState([])
      const customChip = item => {
        return (
          <div>
            <span>{item} - (active)</span>
            <i className="pi pi-user-plus"></i>
          </div>
        )
      }
    
      const [popchecked, setPopchecked] = useState(false)
    
      const handlePopupCheckbox = e => {
        setPopchecked(e.checked)
      }
    
      // interview popup ends

      const priorityValue = [
        { name: 'Low', value: 'low' },
        { name: 'Medium', value: 'medium' },
        { name: 'High', value: 'high' },
      ];



    return<>

     <CascadeSelect
                        // value={selectedSchedule}
                        onChange={handleScheduleChange}
                        options={actScheduleOptions}
                        optionLabel="name"
                        optionGroupLabel="name"
                        className="md:w-10rem me-1"
                        optionGroupChildren={['subItems', 'subItems']}
                        breakpoint="767px"
                        placeholder="Schedule"
                      />


          {/* Interview schedule start */}
      <Dialog
        header="APPOINTMENT - ANUP GOGOI"
        visible={interviewpop}
        className="interview-popup"
        style={{ width: '50vw' }}
        // onHide={() => { if (!interviewpop) return; SetInterviewpop(false); }}
        onHide={() => { SetInterviewpop(false); }}
      >
        <form>
          <p className="bg-form">
            <div className="mb-4">
              <Row className="mb-2">
                <Col xl={6}>
                  <div className="p-field flex flex-column">
                    <label htmlFor="interview">Type</label>
                    <InputText disabled value={intertype}
                       />
                    {/* <Dropdown 
                                                              // disabled
                                                              value={intertype}
                                                              onChange={(e) => setintertype(e.target.value)}
                                                              options={interviewdroptype}
                                                              className="w-full search-option" /> */}
                  </div>
                </Col>

                <Col xl={6}>
                  <div className="p-field flex flex-column">
                    <label
                      htmlFor="integer"
                      className=" block"
                    >
                      Sub-Type
                    </label>
                    <Dropdown
                      value={subtype}
                      onChange={(e) => setSubtype(e.value)}
                      options={typeInterview}
                      optionLabel="name"

                      placeholder="Subtype"
                      className="w-full search-option"
                    />
                  </div>
                </Col>

              </Row>

              <Row>
                <Col xl={6}>
                  <Row className="mb-2">
                    <Col xl={6}>
                      <div className="p-field flex-auto">
                        <label htmlFor="buttondisplay" className="block">
                          Start date
                        </label>
                        <Calendar
                          value={startdate}
                          onChange={(e) => setStartdate(e.value)}
                          showIcon
                        />
                      </div>
                    </Col>


                    <Col xl={6}>
                      <div className="p-field flex-auto">
                        <label htmlFor="buttondisplay" className="block">
                          Time
                        </label>
                        <Calendar
                          value={starttime}
                          onChange={(e) => setStarttime(e.value)}
                          showIcon
                          timeOnly
                          icon={() => <i className="pi pi-clock" />}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>


                <Col xl={6}>
                  <Row className="mb-2">
                    <Col xl={6}>
                      <div className="flex-auto">
                        <label htmlFor="buttondisplay" className="block">
                          End date
                        </label>
                        <Calendar
                          value={enddate}
                          onChange={(e) => setenddate(e.value)}
                          showIcon
                        />
                      </div>
                    </Col>


                    <Col xl={6}>

                      <div className="flex-auto">
                        <label htmlFor="buttondisplay" className="block">
                          Time
                        </label>

                        <Calendar
                          value={endtime}
                          onChange={(e) => setendtime(e.value)}
                          showIcon
                          timeOnly
                          icon={() => <i className="pi pi-clock" />}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>


            <div className="mb-4">
              <Row className="mb-2">
                <Col xl={6}>
                  <div className="flex flex-column">
                    <label For="Priority">Job</label>
                    <Dropdown
                      value={subtypeget}
                      onChange={e => setsubtypeget(e.value)}
                      options={typeInterviewval}
                      optionLabel="name"
                      placeholder="Select a Status"
                      className="w-full search-option"
                    />
                  </div>
                </Col>

                <Col xl={6}>
                  <div className="p-field flex flex-column">
                    <label
                      For="Priority"
                      className=" block"
                    >
                      Contact
                    </label>

                    <Dropdown
                      value={prioritycontact}
                      onChange={(e) => setprioritycontact(e.value)}
                      options={typeInterviewcontact}
                      optionLabel="name"
                      placeholder="Contact"
                      className="w-full search-option"
                    />
                  </div>
                </Col>
              </Row>

              <Row className="mb-2">
                <Col xl={6}>
                  <div className="p-field flex flex-column">
                    <label For="Candidate">Candidate</label>
                    <MultiSelect
                      value={condidatevalu}
                      disabled
                      onChange={e => { condidatelist(e) }}
                      options={typeInterviewcondi}
                      optionLabel="name"
                      placeholder={`Select Candidates`}
                      maxSelectedLabels={0}
                      className="w-full" />
                    {/* <Dropdown
                                                              value={condidatevalu}
                                                              onChange={e => setcondidatevalu(e.value)}
                                                              options={typeInterviewcondi}
                                                              optionLabel="name"
                                                              placeholder="Select a Status"
                                                              className="w-full search-option"
                                      
                                                            /> */}
                  </div>
                </Col>
                <Col xl={6}>
                  <div className="p-field flex flex-column">
                    <label htmlFor="username">Subject</label>
                    <InputText placeholder="Subject" value={subjectval} onChange={e => setsubjectval(e.target.value)} />
                  </div>
                </Col>
              </Row>

              <Row className="mb-2 mt-3">
                <Col xl={12}>
                  <div className="">
                    <InputTextarea
                      className="w-full"
                      value={popTextares}
                      onChange={(e) => setPopTextares(e.target.value)}
                      placeholder="Interview Test"
                      rows={3}
                      cols={20}
                    />
                  </div>
                </Col>
              </Row>
            </div>


            <div>
              <Row className="mb-2">
                

              {!(selectedSchedule?.name === 'Interview' || selectedSchedule?.name === 'Call' || selectedSchedule?.name === 'Other') && (
  <>
    <Col xl={6}>
      <div className="p-field">
        <label htmlFor="username">Auto Followup</label>
        <Dropdown
          value={followup}
          onChange={(e) => setFollowup(e.value)}
          options={followupOptions}
          optionLabel="name"
          placeholder="Select a Followup Interval"
          className="w-full search-option"
        />
      </div>
    </Col>

    <Col xl={6}>
      <Row>
        <Col xl={6}>
          <div className="p-field flex flex-column">
            <label htmlFor="username">Repeat</label>
            <Dropdown
              value={repeat}
              onChange={(e) => setRepeat(e.value)}
              options={repeatOptions}
              optionLabel="name"
              placeholder="Select a Repeat Option"
              className="w-full search-option"
            />
          </div>
        </Col>

        <Col xl={6}>
          <div className="p-field flex flex-column">
            <label htmlFor="username">Reminder</label>
            <Dropdown
              value={reminder}
              onChange={(e) => setReminder(e.value)}
              options={reminderOptions}
              optionLabel="name"
              placeholder="Select a Reminder"
              className="w-full search-option"
            />
          </div>
        </Col>
      </Row>
    </Col>
  </>
)}


                 
              </Row>
              <Row className="mb-2">
                <Col lg={6}>
                  <Row>
                    <Col xl={6}>
                      <div className="p-field flex flex-column">
                        <label
                          For="Priority"
                          className=" block"
                        >
                          Priority
                        </label>
                        <Dropdown
                          value={priority}
                          onChange={(e) => setPriority(e.value)}
                          options={priorityValue}
                          optionLabel="name"
                          placeholder="Priority"
                          className="w-full search-option"
                        />
                      </div>
                    </Col>
                    <Col xl={6}>

                      <Row className="mt-2">
                        <Col xl={6}>
                          <div className="d-flex align-items-center mt-4">
                            <Checkbox
                              inputId="checkbox"
                              checked={popchecked}
                              onChange={handlePopupCheckbox}
                            />
                            <label htmlFor="username" className="ms-1 mt-2">Completed</label>

                          </div>
                        </Col>

                        <Col xl={6}>
                          <div className="d-flex align-items-center mt-4">
                            <Checkbox
                              inputId="checkbox"
                              checked={popchecked2}
                              onChange={handlePopupCheckbox2}
                            />
                            <label htmlFor="username" className="ms-1 mt-2">Private</label>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col xl={6}>
                  <label htmlFor="username">User Id's</label>
                  <Chips value={userid} onChange={(e) => setUserid(e.value)} itemTemplate={customChip} className="w-full" />
                </Col>
              </Row>
            </div>


            <Row className="">
              <Col xl={12}>
                <div className="d-flex justify-content-end">
                  <button type="submit" class="btn btn-success me-2">
                    <i className="pi pi-save me-1"></i>
                    Save
                  </button>
                  <button
                    color="primary"
                    className="btn btn-primary waves-effect waves-light me-2 cancel-outlinebtn"
                  >
                    <i className="pi pi-times me-1"></i>
                    Cancel
                  </button>
                </div>
              </Col>
            </Row>

          </p>
        </form>
      </Dialog>
      {/* Interview schedule end */}
    </>
}

export default ScheduleInterview;
