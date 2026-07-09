namespace Common;
public class Result<T> : Result
{
    public T? Value { get; }

    private Result (T? value, Error? error) : base (error)
    {
        Value = value;
    }

    public static Result<T> Success(T value) => new Result<T>(value, null);
    public new static Result<T> Failure(Error error) => new Result<T>(default, error);
}

public class Result
{
    public Error? Error { get; } 
    public bool IsSuccess => Error == null;
    protected Result(Error? error)
    {
        Error = error;
    }
    public static Result Success() => new Result(null);
    public static Result Failure(Error error) => new Result(error);
}