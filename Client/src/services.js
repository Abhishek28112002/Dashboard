let url="http://localhost:8025/api/post/";

 const Fetchpostapi=async(data)=>{
 
    const requestOptions = {
        method: 'POST',
        body:  JSON.stringify(data),
        headers: {
            'Content-type' : 'application/json'
          }
      };
      try {
        const res = await fetch(url,requestOptions);
        const data = await res.json();
        return data;
    } catch (err) {
        console.log(err);
    }
    }
 const Fetchgetapi=async()=>{
     
          try {
              const res = await fetch(url);
              const data = await res.json();
              return data.message;
          } catch (err) {
              console.log(err);
          }
    }
    const Fetchputapi=async(data)=>{
        console.log(data);
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
              },
            body:  JSON.stringify(data),
          };
        try {
            const res = await fetch(url,requestOptions);
            const data = await res.json();
            return data;
        } catch (err) {
            console.log(err);
        }
  }
  const Fetchdeleteapi=async(todoId)=>{
    const requestOptions = {
        method: "DELETE",
      };
    try {
        const res = await fetch(url + `${todoId}`,requestOptions);
        return res.messages;
    } catch (err) {
        console.log(err);
    }
}
export {Fetchgetapi,Fetchpostapi,Fetchputapi,Fetchdeleteapi};