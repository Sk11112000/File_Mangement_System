import java.io.*;
import java.util.Scanner;
import java.util.concurrent.TimeUnit;

public class New  {
    private static boolean isWindows = System.getProperty("os.name").toLowerCase().startsWith("windows");

    public static void main(String[] args) throws Exception {
        // Where we want to execute
        Scanner sc=new Scanner(System.in);
        File location = new File("/Users/sunnykulshrestha/Desktop/code/JavaScript/");
        String s="node \"main.js\" organize ";
        System.out.println("Enter the file path you want to Organize in double quotes");
        String s3=sc.nextLine();
        runCommand(location,s+s3+";"); // for Mac(Linux based OS) users list files

        // runCommand(location, "dir"); // For Windows users list files
    }

    public static void runCommand(File whereToRun, String command) throws Exception {
        System.out.println("Running in: " + whereToRun);
        System.out.println("Command: " + command);

        ProcessBuilder builder = new ProcessBuilder();
        builder.directory(whereToRun);

        if(isWindows) {
            builder.command("cmd.exe", "/c", command);
        }else {
            builder.command("sh", "-c", command);
        }

        Process process = builder.start();

        OutputStream outputStream = process.getOutputStream();
        InputStream inputStream = process.getInputStream();
        InputStream errorStream = process.getErrorStream();

        printStream(inputStream);
        printStream(errorStream);

        boolean isFinished = process.waitFor(30, TimeUnit.SECONDS);
        outputStream.flush();
        outputStream.close();

        if(!isFinished) {
            process.destroyForcibly();
        }
    }

    private static void printStream(InputStream inputStream) throws IOException {
        try(BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream))) {
            String line;
            while((line = bufferedReader.readLine()) != null) {
                System.out.println(line);
            }

        }
    }
}