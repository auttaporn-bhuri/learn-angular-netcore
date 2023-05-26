using System.Text.Json;

namespace WebAPI.Errors
{
    public class ApiError
    {
        public int ErrorCode { get; set; }
        public string ErrorMessage { get; set; }
        public string ErrorDetails { get; set; }

        public override string ToString() {
            return JsonSerializer.Serialize(this);
        }

        public ApiError(int _errorCode, string _errorMessage, string _errorDetail = null)
        {
            this.ErrorCode = _errorCode;
            this.ErrorMessage = _errorMessage; 
            this.ErrorDetails = _errorDetail;  
        }
    }
}
