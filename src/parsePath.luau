--!strict
--!native
--!optimize 2

--- Parses the provided `path` into an array of strings.
--- This function also excludes any empty string entries from the result array.
--- That means that the values `child_1/child_2` and `child_1/child_2/` will have exactly the same output.
local function parsePath(path: string): { string }
	local pathArray = string.split(path, "/")

	for index = #pathArray, 1, -1 do
		if pathArray[index] == "" then
			table.remove(pathArray, index)
		end
	end

	return pathArray
end

return parsePath
