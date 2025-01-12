import os
import sys

def main():
    try:
        import pyperclip
    except ImportError:
        print("The 'pyperclip' module is not installed.")
        print("You can install it by running 'pip install pyperclip'.")
        sys.exit(1)

    base_path = os.getcwd()
    base_folder_name = os.path.basename(base_path.rstrip(os.sep))

    folder_structure_lines = []
    js_files_contents = []

    # Calculate the base depth to determine indentation
    base_depth = base_path.rstrip(os.sep).count(os.sep)

    # Directories to exclude
    excluded_dirs = {'node_modules', '.next'}

    for root, dirs, files in os.walk(base_path, topdown=True):
        # Modify dirs in-place to exclude unwanted directories
        dirs[:] = [d for d in dirs if d not in excluded_dirs]

        # Calculate current depth
        current_depth = root.rstrip(os.sep).count(os.sep) - base_depth
        indent = '    ' * current_depth

        # Get the folder name
        if root == base_path:
            folder_name = f"|{base_folder_name}"
        else:
            folder_name = f"{indent}|---->{os.path.basename(root)}"

        folder_structure_lines.append(folder_name)

        # Process files in the current directory
        for file in sorted(files):
            file_indent = '    ' * (current_depth + 1)
            file_line = f"{file_indent}|{file}"
            folder_structure_lines.append(file_line)

            if file.endswith('.js') or file.endswith('.tsx') or file.endswith('.ts'):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                except Exception as e:
                    content = f"Error reading file: {e}"
                # Store the relative file path and its content
                relative_file_path = os.path.relpath(file_path, base_path)
                js_files_contents.append((relative_file_path, content))

    # Build the folder structure string
    folder_structure = '\n'.join(folder_structure_lines)

    # Build the contents string
    contents_lines = []
    for filename, content in js_files_contents:
        contents_lines.append(f"{filename}\n{content}\n")
    contents = '\n'.join(contents_lines)

    # Combine both sections
    final_string = f"filestructure\n{folder_structure}\n\ncontents\n{contents}"

    # Print the final string
    print(final_string)

    # Copy the final string to the clipboard
    try:
        pyperclip.copy(final_string)
        print("\nThe folder structure and .js file contents have been copied to the clipboard.")
    except pyperclip.PyperclipException as e:
        print(f"Failed to copy to clipboard: {e}")

if __name__ == "__main__":
    main()