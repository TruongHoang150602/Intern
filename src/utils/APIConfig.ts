class APIConfig {

    // TEST
    static GET_ALL_TESTS = "/tests";
    static UPDATE_TEST = "/tests/:testId";
    static DELETE_TEST = "/:testId"


    static GET_USER_RESULT = "/:userId/:testId/type";
    static CREATE_NEW_USER_RESULT = "/:userId/:testId/type";
    static UPDATE_USER_RESULT = "/:userResultId";

}

export default APIConfig;