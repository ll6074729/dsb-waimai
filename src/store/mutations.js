export default{
    changeCity (state, defaultCity) {
        state.defaultCity = defaultCity
        try {
          localStorage.defaultCity = defaultCity
        } catch (e) {}
    }
}