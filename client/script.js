const axios = window.axios
const submitButton =document.getElementById("submit")
const input = document.getElementById("input")
const output = document.getElementById("output")

submitButton.addEventListener("click",(e) => {
	e.preventDefault()
	if (input.files.length === 0){
		alert("Pick one file")
	}else {
		console.log(input.files.length)
		let file = input.files[0]
		let reader = new FileReader()
		reader.readAsText(file);
		reader.onload = () => {
			const timestamp = new Date().getTime()
			const randomNumber = Math.floor(Math.random() * 101)

			axios.post("http://localhost:9000/upload",{
				file:reader.result,
				timestamp:timestamp,
				randomNumber:randomNumber,
			})
			.then((res) => {
				console.log(res)
				output.innerText = `HTTP Status Code received : ${res.status}`
				console.log(res.data)

			})
			.catch((err) => {
				console.log(err)
			})
		};

		reader.onerror = () =>  {
			console.log("Reader erroe",reader.error);
		};
	}
})
