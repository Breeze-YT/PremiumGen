<!-- Please remove this file from your project -->
<template>
<div>
  <button class="bg-gray-500 text-white" @click.prevent="GenerateCode()">Generate Premium code</button>
  <p id="newCode">Your New code:</p>
  <br>
  <p>Enter a code to delete</p>
  <form action="" @submit.prevent="DelCode()">
    <input class="w-64 border-2" id="inputedCode" type="text" placeholder="premium_key_i0iZnLZR1WA3">
    <button class="bg-gray-500 text-white">Delete Code</button>
    <p id="Itworkedtext" class="text-green-500 hidden">Yay! You succesfully deleted a code</p>
    <p id="ItNOworkedtext" class="text-red-500 hidden">Uh Oh, I couldnt find that code in the database! If this problem persists contact CiaranGames#5051</p>
  </form>
  <br>
  <p>Here is all the codes to the recent refresh!!!</p>
  <ul>
      <li class="text-black" v-for="codes in premuimCodes" :key="codes.premiumcode">
            {{ codes.premiumcode }}
      </li>
  </ul>
</div>

</template>

<script>
export default {
  name: 'NuxtTutorial',
  data() {
    return {
      premuimCodes: [],
    }
  },
  async fetch() {

    const data = await this.$http.$get(`https://mysaftey-web.herokuapp.com/api/v1/create`)
    // console.log(data.Codes)
    for(let i = 0; i < data.Codes.length; i++) {
      this.premuimCodes.push(data.Codes[i])
    }

  },
  methods: {
    async GenerateCode() {
      const data = await this.$http.$post(`https://mysaftey-web.herokuapp.com/api/v1/create`)
      // console.log(data.Code)
      var code = data.Code
      var newcode = document.getElementById("newCode")
      newcode.innerHTML = `Your New code: ${code}`
    },
    async DelCode() {
      var inputedcode = document.getElementById("inputedCode").value
      const data = await this.$http.$delete(`https://mysaftey-web.herokuapp.com/api/v1/create?code="${inputedcode}"`)
      // console.log(data.success)

      var itworked = document.getElementById("Itworkedtext")
      var itNOworked = document.getElementById("ItNOworkedtext")

      if (data.success == true) {
        itworked.classList.remove("hidden")
        setTimeout(() => { itworked.classList.add("hidden") }, 8000);
      } else if (data.success == false) {
        itNOworked.classList.remove("hidden")
        setTimeout(() => { itNOworked.classList.add("hidden") }, 8000);
      }
    }
  }
}
</script>
