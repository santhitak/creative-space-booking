import { useGoogleLogin } from '@react-oauth/google';

const Login = () => {
  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: async (codeResponse) => {
      console.log(codeResponse);
      const codeResp = { code: codeResponse.code };
      const code = JSON.stringify(codeResp);
      const tokens = await fetch('http://localhost:3000/auth/signin', {
        method: 'POST',
        body: code,
      });

      console.log(tokens);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <div>
      <button onClick={googleLogin}>Login</button>
    </div>
  );
};

export default Login;
