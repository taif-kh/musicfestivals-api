import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Item1 from './components/Item1';
import Item0 from './components/Item0';
import Item2 from './components/Item2';
import Component1 from './components/Component1';
import Component2 from './components/Component2';
import Component3 from './components/Component3';
import Component4 from './components/Component4';
import Component5 from './components/Component5';
import Item3 from './components/Item3';
import Item4 from './components/Item4';




const Home = () => {
  const [user, setUser] = useState(null); // Store both token and email
  const [item, setItem] = useState(0);
  const [userDetails, setUserDetails] = useState({});
  const [hidden, setHidden] = useState(true);
  const component1Ref = useRef(null);
  const component2Ref = useRef(null);
  const component3Ref = useRef(null);
  const component4Ref = useRef(null);
  const component5Ref = useRef(null);
  const component6Ref = useRef(null);

  const topRef = useRef(null);


  

  const handleScroll = () => {
    if (component1Ref.current) {
      component1Ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    if (topRef?.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };



  async function signupHandle(e) {
    e.preventDefault(); 
  
    const formData = new FormData(e.target); 
    const data = Object.fromEntries(formData.entries());
  
    axios.post('http://localhost:3000/sign-up', data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('There was an error submitting the form!', error);
      });
  };

  const names = ['List Events', 'Create Event', 'Get event', 'Delete Event', 'Update Event', 'Limit Result', 'List an artist\'s Events', 'List a city\'s Events', 'Hide Event', 'Modify an Event\'s field', 'Get API Key', 'Create/Modify API Key', 'Sign Up', 'Log In', 'Get a user\'s Events', 'Get User', 'List Users', 'Delete User'];
  const paths = ['/events', ''];
  async function addToken(data) {
    try {
      let response = await fetch("http://localhost:3000/log-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
        mode: "cors",
      });

      const result = await response.json();
      console.log("Response from server:", result);

      const jwt_token = result.token;
      const id = result.id; // Get the user ID
      const email = result.email;

      if (jwt_token && id && email) {
        setUser({ token: jwt_token, id: id, email: email });
        localStorage.setItem("jwt_token", jwt_token);
        localStorage.setItem("id", id); // Store the user ID
        localStorage.setItem("email", email);
        console.log("User state set:", { token: jwt_token, id: id, email: email });
      } else {
        console.log("JWT token, id, email, or username is missing from the response.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }


  function removeToken() {
    setUser(null);
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("email");
    localStorage.removeItem("id");
    setHidden(true);
  }

  async function LoginSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const dataEntries = Object.fromEntries(data.entries());
    const dataJson = JSON.stringify(dataEntries);
    await addToken(dataJson);
  }
    // --------------------------------------------------------


  useEffect(() => {
    // Optionally, retrieve the email from localStorage if the user is already logged in
    const storedEmail = localStorage.getItem("email");
    const storedId = localStorage.getItem("id");
    const storedToken = localStorage.getItem("jwt_token");
    if (storedToken && storedEmail && storedId) {
      setUser({ token: storedToken, email: storedEmail, id: storedId });
      console.log("User restored from localStorage:", { token: storedToken, email: storedEmail, id: storedId });
    }
    //---------------------

    // ----------


  }, []);
  // border-orange-700  

  console.log("Rendering component with user:", user);

  useEffect(() => {
    if (user && user.id) {
      axios.get(`http://localhost:3000/users/${user.id}`)
        .then((response) => {
          setUserDetails(response.data);
          console.log("userDetails:", response.data);
        })
        .catch(error => console.log(error));
    }
    console.log(userDetails);
    
  }, [user]);


  const ChangeKey = (user) => {
    axios.post(`http://localhost:3000/key/${user.id}`)
    .then((response) => {
      setUserDetails(response.data);
      console.log("userDetails:", response.data);
    })
    .catch(error => console.log(error));
}
console.log(userDetails);


  // const postsWithComments = posts.map(post => {
  //   return {
  //     ...post,
  //     comments: comments.filter(comment => comment.postId === post.id)
  //   };
  // });

  const handleCopy = () => {
    const textToCopy = `${userDetails.apiKey}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        console.log("Text copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };


  return (
    <html lang="en">
      <body className="border-white   w-screen h-screen flex flex-col font-inter overflow-hidden">
        <div>
        {/* ---------------------------------------------------------------- */}
        <div>
          {/* If user is logged in, show the welcome message and token */}
        {user && (
          <div className="">

            <div className='flex flex-col justify-center items-center w-screen h-screen   relative '>
              


            {/* ---- USER DETAILS --- */}

                {/* ---- USER DETAILS --- */}
                <button onClick={removeToken} className="mt-2 bg-red-500 text-white px-4 py-2 rounded text-[16px] w-[100px] h-12 absolute right-4 top-4  hover:shadow-[0px_0px_10px_4px_rgba(255,0,0,0.5)]  ">
              Log Out
            </button>




            {/* ---- GETY API --- */}
              <div className='flex items-center pr-[570px] gap-x-3 '>
              <p className='text-[28px] font-bold '>Get your API Key</p>
            <img
                  src="/copy.png"
                  alt="Copy"
                  className="invert w-[20px] h-[20px] cursor-pointer"
                  onClick={() =>handleCopy()}
                />
                </div>
              <div className='bg-[#212121] w-[817px] h-[148px] rounded-[9px] flex flex-col items-center justify-center'>
              <div className="font-mono text-lg">{userDetails.apiKey ? userDetails.apiKey : '' } </div>
              </div>
              {/* pr-[690px]  */}
              <div className='flex gap-x-3  w-[817px] items-center justify-between'>
                <div className='flex items-center gap-x-1'>
                <button className='text-[21px] font-semibold ' onClick={() =>{ChangeKey(user)}}>{userDetails.apiKey ? 'Change' : 'Create'} it</button>
              <img src="/refresh.png"
                                className=" w-[20px] h-[20px] cursor-pointer"
              />
                  </div>
                  <div className='text-[16px] flex gap-x-3 justify-self-end'><p className='font-semibold text-[16px]'>Your id: </p> { user.id} </div>
              </div>

            </div>

          </div>
        )}
          {/* If no user is logged in */}
          {!user &&           
          <div className={`${hidden ? 'hidden' : '' } w-screen h-screen`}>

<button onClick={() => setHidden(!hidden)} className=' px-9 py-9  w-screen flex justify-end'> <img src="/reject.png" className='invert w-11 h-11' /> </button>
<div className='px-9 py-9 flex flex-col items-start justify-start w-screen h-screen '>
<div className=''>
<h2 className="">Log In</h2>
          <form onSubmit={LoginSubmit} className=' flex flex-col justify-center items-start w-screen h-[50px]'>
            <div className="text-white flex  items-center justify-around ">
              <label>
                Email
                <input type="text" name="email" className="w-52 text-black ml-3" />
              </label>
              <label className='ml-3'>
                Password
                <input type="password" name="password" className="w-52 text-black ml-3" />
              </label>
              <button type="submit" className=" ml-10 border-2 text-white px-4 py-2 rounded h-[30px] text-[16px] flex items-center justify-center">
                Log In
              </button>
            </div>
          </form>
</div>
          <div className='w-full h-10'></div>
          {/* -------SIGNUP-------------------- */}
<div>
<h2 className="">Sign Up</h2>
          <form onSubmit={signupHandle} className=' flex flex-col justify-center items-start w-screen h-[50px]'>
            <div className="text-white flex  items-center justify-around ">
              <label>
                Email
                <input type="text" name="email" className="w-52 text-black ml-3" />
              </label>
              <label className='ml-3'>
                Password
                <input type="password" name="password" className="w-52 text-black ml-3" />
              </label>
              <button type="submit" className=" ml-10 border-2 text-white px-4 py-2 rounded h-[30px] text-[16px] flex items-center justify-center">
                Sign Up
              </button>
            </div>
          </form>
</div>
</div>
          </div>
          }

        </div>


          <hr className='border-white'  ref={topRef}/>
          <div className='bg-black'>
                        {/* <Component1 /> */}
          <div className=' flex flex-col h-[685px] w-screen py-[42px] pl-[66px] pr-[60px] '>
            <div className='flex self-end  w-[650px] justify-evenly '>
            <p className=' border-r-2 w-[250px] flex items-center justify-center '>Presentation</p>
            <button onClick={() => setHidden(!hidden)} className='text-[28px] border-r-2 w-[250px] flex items-center justify-center '>Signup/Login</button>
            <p className='w-[250px] flex items-center justify-center '>API Reference</p>
            </div>
            <div className='h-[75px] w-screen '></div>
            <h1 className='text-[67px] '>MusicEvents API</h1>
            <div className='h-[26px]  w-screen '></div>
            <p>MusicEvents API for your events’ website</p>
            <div className='h-[120px]  w-screen'></div>
            <button
        className="w-[160px] h-[64px] bg-white text-black rounded-[45px] flex justify-center items-center"
        onClick={handleScroll}
      >
        Get started
      </button>   
      <div>
      <div className='pl-20 font-medium list-disc flex gap-x-16 w-[1300px] items-center justify-center pt-32'>
 <div className='flex items-center justify-start gap-x-3 '>        <h2>React.js </h2>         <img src="/react.svg" className="invert w-14 h-14" alt="React Logo" />
</div>
        <div className='flex items-center justify-start gap-x-3'>        <h2>PostgreSQL </h2>         <img src="/postgre.svg" className="invert w-14 h-14" alt="React Logo" />
        </div>
        <div className='flex items-center justify-start gap-x-3'>        <h2>Express.js </h2>         <img src="/expressOne.svg" className="invert w-14 h-16" alt="React Logo" />
        </div>
        <div className='flex items-center justify-start gap-x-3'>        <h2>Node.js </h2>         <img src="/nodejs.svg" className="invert w-14 h-14" alt="React Logo" />
        </div>
        </div>
      </div>
  </div>








  <Component1 ref={component1Ref} component2Ref={component2Ref} />
      <Component2 ref={component2Ref} component3Ref={component3Ref} />
      <Component3 ref={component3Ref} component4Ref={component4Ref} />
      <Component4 ref={component4Ref} component5Ref={component5Ref} />


<Component5 ref={component5Ref} component6Ref={component6Ref} />

            <div ref={component6Ref} className='relative overflow-hidden w-screen h-screen   border-purple-600 '>
              <div className='w-screen h-4 '></div>
            <h1 className='text-[67px] font-semibold ml-[23px] '>API Reference</h1>
            <div className='w-screen h-4 '></div>
            {/* <div className='w-full h-7 '></div> */}
            {/* w-[310px]  */}
<div className='flex overflow-x-hidden'>
  {/* --api reference splitted into two */}
<div className='w-[400px] h-[580px] border-opacity-50 flex flex-col items-center pl-14 gap-y-[40px] overflow-y-auto overflow-x-hidden pb-12 '>
              {/* ---------- */}
              <p className='mr-[70px] border-b-2 w-full h-full text-[37px] '>Events</p>
              <div className='flex items-start justify-start gap-x-2 w-full h-full'>
                <div className='bg-[#008753] w-[48px] h-[24px] rounded-[6px] flex items-center justify-center text-[12px] '>GET</div>
                <button className='text-[16px]' onClick={() => setItem(0)}>List Events</button>
              </div>
              <div className='flex items-center justify-start gap-x-2 w-full h-full'>
                <div className='bg-[#0074E8] w-[48px] h-[24px] rounded-[6px] flex items-center justify-center text-[12px] '>POST</div>
                <button className='text-[16px] 'onClick={() => setItem(1)}>Create Event</button>
              </div>
              <div className='flex items-start justify-start gap-x-2 w-full h-full'>
                <div className='bg-[#008753] w-[48px] h-[24px] rounded-[6px] flex items-center justify-center text-[12px] '>GET</div>
                <button className='text-[16px]' onClick={() => setItem(2)}>Get event</button>
              </div>
              <div className='flex items-center justify-start gap-x-2 w-full h-full'>
                <div className='bg-[#CC0000] w-[48px] h-[24px] rounded-[6px] flex items-center justify-center text-[12px] '>DEL</div>
                <button className='text-[16px] ' onClick={() => setItem(3)}>Delete Event</button>
              </div>
              <div className='flex items-center justify-start gap-x-2 w-full h-full'>
                <div className='bg-[#BD5B00] w-[48px] h-[24px] rounded-[6px] flex items-center justify-center text-[12px] '>PUT</div>
                <button className='text-[16px] ' onClick={() => setItem(4)}>Update Event</button>
              </div>
              <div className='flex items-start justify-start gap-x-2 w-full h-full'>
                <div className='bg-[#008753] w-[48px] h-[24px] rounded-[6px] flex items-center justify-center text-[12px] '>GET</div>
                <button className='text-[16px] '>//Limit Result</button>
              </div>
              <div className='flex items-start justify-start gap-x-2 w-full h-full'>
                <div className='bg-[#008753] w-[48px] h-[24px] rounded-[6px] flex items-center justify-center text-[12px] '>GET</div>
                <button className='text-[16px] '>List an artist's Events</button>
              </div>
              <div className='flex items-start justify-start gap-x-2 w-full h-full'>
                <div className='bg-[#008753] w-[48px] h-[24px] rounded-[6px] flex items-center justify-center text-[12px] '>GET</div>
                <button className='text-[16px] '>List a city's Events</button>
              </div>
              <div className='flex items-center justify-start gap-x-2 w-full h-full'>
                <div className='bg-[#BD5B00] w-[48px] h-[24px] rounded-[6px] flex items-center justify-center text-[12px] '>PUT</div>
                <button className='text-[16px] '>Hide Event</button>
              </div>
              <div className='flex items-center justify-start gap-x-2 w-full h-full'>
                <div className='bg-[#BD5B00] w-[48px] h-[24px] rounded-[6px] flex items-center justify-center text-[12px] '>PUT</div>
                <button className='text-[16px] '>Modify an Event's field</button>
              </div>
              {/* ********************** */}
              <p className='mr-[70px] border-b-2 w-full h-full text-[37px] '>API Key</p>
              <div className='flex items-start justify-start gap-x-2 w-full h-full'>
                <div className='bg-[#008753] w-[48px] h-[24px] rounded-[6px] flex items-center justify-center text-[12px] '>GET</div>
                <button className='text-[16px] '>Get API Key</button>
              </div>
              <div className='flex items-center justify-start gap-x-2 w-full h-full'>
                <div className='bg-[#0074E8] w-[48px] h-[24px] rounded-[6px] flex items-center justify-center text-[12px] '>POST</div>
                <button className='text-[16px] '>Create/Modify API Key</button>
              </div>
              {/* ********************** */}
              <p className='mr-[70px] border-b-2 w-full h-full text-[37px] '>Users</p>
              <div className='flex items-center justify-start gap-x-2 w-full h-full'>
                <div className='bg-[#0074E8] w-[48px] h-[24px] rounded-[6px] flex items-center justify-center text-[12px] '>POST</div>
                <button className='text-[16px] '>Sign Up</button>
              </div>
              <div className='flex items-center justify-start gap-x-2 w-full h-full'>
                <div className='bg-[#0074E8] w-[48px] h-[24px] rounded-[6px] flex items-center justify-center text-[12px] '>POST</div>
                <button className='text-[16px] '>Log In</button>
              </div>
              <div className='flex items-start justify-start gap-x-2 w-full h-full'>
                <div className='bg-[#008753] w-[48px] h-[24px] rounded-[6px] flex items-center justify-center text-[12px] '>GET</div>
                <button className='text-[16px] '>Get a user's Events</button>
              </div>
              <div className='flex items-start justify-start gap-x-2 w-full h-full'>
                <div className='bg-[#008753] w-[48px] h-[24px] rounded-[6px] flex items-center justify-center text-[12px] '>GET</div>
                <button className='text-[16px] '>Get User</button>
              </div>
              <div className='flex items-start justify-start gap-x-2 w-full h-full'>
                <div className='bg-[#008753] w-[48px] h-[24px] rounded-[6px] flex items-center justify-center text-[12px] '>GET</div>
                <button className='text-[16px] '>List Users</button>
              </div>
              <div className='flex items-center justify-start gap-x-2 w-full h-full'>
                <div className='bg-[#CC0000] w-[48px] h-[24px] rounded-[6px] flex items-center justify-center text-[12px] '>DEL</div>
                <button className='text-[16px] '>Delete User</button>
              </div>
              {/* ********************** */}

              {/* ---------- */}
            </div>
             {/* ----PART 2---- */}
             {item == 0 && (<Item0 />)}
             {item == 1 && <Item1 />}
             {item == 2 && <Item2 />}
             {item == 3 && <Item3 />}
             {item == 4 && <Item4 />}

</div>
            {/* 696 */}
<button onClick={scrollToTop} className="absolute right-[700px] bottom-0 rotate-180">
        <img src="/down.png" alt="Scroll Down" />
      </button>
            </div>

            <div>

            </div>
          </div>
          {/* ---------------------------------------------------------------- */}
        </div>
      </body>
    </html>
  );

};

export default Home;